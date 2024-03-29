import { COLLECTIONS } from '@src/lib/enums/collections';
import { DB } from '@src/settings/firebase';
import { Project } from '@src/types/projects';
import {
  FirestoreDataConverter,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';

const ProjectConverter: FirestoreDataConverter<Project> = {
  toFirestore: (project: Project) => project,
  fromFirestore: (snapshot: any) => snapshot.data(),
};

const list = async (): Promise<Project[]> => {
  const q = query(
    collection(DB, COLLECTIONS.PROJECTS).withConverter(ProjectConverter),
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
  const docCollection = collection(DB, COLLECTIONS.PROJECTS);
  const docRef = doc(docCollection, String(project.id)).withConverter(
    ProjectConverter
  );
  await setDoc(docRef, project);
  return docRef.id;
};

const remove = async (id: string) => {
  const docRef = doc(DB, COLLECTIONS.PROJECTS, id);
  await deleteDoc(docRef);

  return id;
};

export const Projects = {
  list,
  upsert,
  remove,
};
