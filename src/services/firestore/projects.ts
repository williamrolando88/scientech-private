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
  updateDoc,
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

const add = async (project: Project): Promise<string> => {
  const docRef = doc(COLLECTIONS.PROJECTS);
  project.id = docRef.id;

  await setDoc(docRef, project);
  return docRef.id;
};

const update = async (project: Project): Promise<string> => {
  const docRef = doc(COLLECTIONS.PROJECTS, project.id);

  await updateDoc(docRef, project);
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
  add,
  update,
  remove,
  migrate,
};
