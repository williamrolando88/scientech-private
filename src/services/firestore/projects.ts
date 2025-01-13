import { COLLECTIONS_ENUM } from '@src/lib/enums/collections';
import { DB } from '@src/settings/firebase';
import { Project } from '@src/types/projects';
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import { COLLECTIONS } from './collections';

export const ProjectConverter: FirestoreDataConverter<Project> = {
  toFirestore: (project: Project) => project,
  fromFirestore: (snapshot: QueryDocumentSnapshot<Project, DocumentData>) => ({
    ...snapshot.data(),
    startedAt: snapshot.get('startedAt').toDate(),
    estimateFinishDate: snapshot.get('estimateFinishDate').toDate(),
    finishedAt: snapshot.get('finishedAt')?.toDate(),

    // TODO: Delete deprecated properties
    end_date: snapshot.get('end_date')?.toDate(),
    start_date: snapshot.get('start_date')?.toDate(),
  }),
};

const list = async (): Promise<Project[]> => {
  const q = query(
    COLLECTIONS.PROJECTS.withConverter(ProjectConverter),
    orderBy('id', 'desc')
  );
  const querySnapshot = await getDocs(q);

  const projects: Project[] = [];
  querySnapshot.forEach((document) => {
    projects.push(document.data());
  });

  return projects;
};

const upsert = async (project: Project): Promise<string> => {
  let docRef;

  if (project.id) {
    docRef = doc(COLLECTIONS.PROJECTS, project.id).withConverter(
      ProjectConverter
    );
  } else {
    docRef = doc(COLLECTIONS.PROJECTS).withConverter(ProjectConverter);
  }

  await setDoc(docRef, { ...project, id: docRef.id });
  return docRef.id;
};

const remove = async (id: string) => {
  const docRef = doc(DB, COLLECTIONS_ENUM.PROJECTS, id);
  await deleteDoc(docRef);

  return id;
};

const migrate = async (project: Project) => {
  const docRef = doc(COLLECTIONS.PROJECTS, project.id);

  await setDoc(docRef, project);
  return docRef.id;
};

export const Projects = {
  list,
  upsert,
  remove,
  migrate,
};
