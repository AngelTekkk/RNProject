import {
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  doc,
} from "firebase/firestore";
import { db } from "./config";

export const addRecord = async (post) => {
  const docRef = await addDoc(collection(db, "posts"), { post });
  console.log("Post added: ", docRef.id);
  return docRef;
};

export const updateRecord = async (post, comment) => {
  await updateDoc(doc(db, "posts", post), {
    "post.comments": arrayUnion({ ...comment }),
  });
};
