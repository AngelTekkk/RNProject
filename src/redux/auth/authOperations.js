import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authSlice";
import { uploadPhoto } from "../../firebase/uploadPhoto";

const { updateUserProfile, authSignOut, setErrorMessage } = authSlice.actions;

export const authSignUpUser =
  ({ email, password, login, photoUri }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userAvatarUrl = await uploadPhoto(
        photoUri,
        "avatars",
        `${user.uid}.jpg`
      );

      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: userAvatarUrl,
      });

      const userUpdateProfile = {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      dispatch(setErrorMessage({ error: error.message }));
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      const userUpdateProfile = {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      dispatch(setErrorMessage({ error: error.message }));
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    dispatch(setErrorMessage({ error: error.message }));
  }
};

export const authStateCahngeUser = () => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        const userUpdateProfile = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        };

        dispatch(updateUserProfile(userUpdateProfile));
      }
    });
  } catch (error) {
    dispatch(setErrorMessage({ error: error.message }));
  }
};
