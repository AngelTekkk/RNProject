import { collection, onSnapshot } from "firebase/firestore";
import { addRecord, updateRecord } from "../../firebase/postsApi";
import { postsSlice } from "./postsSlice";
import { authSlice } from "../auth/authSlice";
import { uploadPhoto } from "../../firebase/uploadPhoto";
import { db } from "../../firebase/config";

const { setErrorMessage } = authSlice.actions;
const { setPosts } = postsSlice.actions;

export const addPost =
  ({ title, photo, location, id }) =>
  async (dispatch, getState) => {
    try {
      const index = Date.now();
      console.log(title, photo, location, id);
      const photoURL = await uploadPhoto(
        photo,
        `posts/${id}`,
        `${Date.now()}.jpg`
      );
      await addRecord({
        title,
        index,
        photo: photoURL,
        location,
        user: id,
        comments: [],
      });
    } catch (error) {
      dispatch(setErrorMessage([error.message]));
    }
  };

export const addComment =
  ({ postId, user, comment, createdAt }) =>
  async (dispatch, getState) => {
    try {
      console.log(postId, user, comment, createdAt);
      await updateRecord(`${postId}`, {
        user,
        comment,
        createdAt,
      });
    } catch (error) {
      console.log(error);
      dispatch(setErrorMessage([error.message]));
    }
  };

export const subscribePosts = () => async (dispatch, getState) => {
  onSnapshot(collection(db, "posts"), (doc) => {
    const result = [];
    doc.docs.forEach((doc) => {
      const obj = doc.data();
      result.push({ id: doc.id, ...obj.post });
    });
    result.sort((a, b) => b.index - a.index);
    dispatch(setPosts(result));
  });
};
