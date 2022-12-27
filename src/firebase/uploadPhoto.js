import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

export const uploadPhoto = async (file, dir, photoName) => {
  const response = await fetch(file);
  const blob = await response.blob();
  const photoRef = ref(storage, `${dir}/${photoName}`);
  await uploadBytes(photoRef, blob);
  const photoURL = await getDownloadURL(photoRef);

  return photoURL;
};
