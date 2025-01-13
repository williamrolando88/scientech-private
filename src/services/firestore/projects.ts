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
    startedAt: snapshot.get('startedAt')
      ? snapshot.get('startedAt').toDate()
      : new Date(),
    estimateFinishDate: snapshot.get('estimateFinishDate')
      ? snapshot.get('estimateFinishDate').toDate()
      : new Date(),
    finishedAt: snapshot.get('finishedAt')
      ? snapshot.get('finishedAt').toDate()
      : undefined,

    // TODO: Delete deprecated properties
    end_date: snapshot.get('end_date')
      ? snapshot.get('end_date').toDate()
      : undefined,
    start_date: snapshot.get('start_date')
      ? snapshot.get('start_date').toDate()
      : undefined,
  }),
};

const list = async (): Promise<Project[]> => {
  const q = query(
    COLLECTIONS.PROJECTS.withConverter(ProjectConverter),
    orderBy('id', 'desc')
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((document) => document.data());
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
