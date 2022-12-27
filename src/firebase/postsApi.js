import { useDispatch } from "react-redux";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  doc,
  onSnapshot,
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
  console.log("Comment added ");
};
