import { Project } from '@src/types/projects';
import {
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { COLLECTIONS } from './collections';

const list = async (): Promise<Project[]> => {
  const q = query(COLLECTIONS.PROJECTS, orderBy('id', 'desc'));
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
  const docRef = doc(COLLECTIONS.PROJECTS, id);
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
