import {
   ref,
   uploadBytes,
   getDownloadURL,
   listAll,
   list,
   deleteObject,
} from "firebase/storage";
import { storage } from "./../../firebase";

export const firebaseUploadPhoto = async (file: any, url: string) => {
   const imageRef = ref(storage, url);
   return await uploadBytes(imageRef, file).then((snapshot) => {
      const downloadUrl = getDownloadURL(snapshot.ref).then((url) => url);
      return downloadUrl
   })
}

export const firebaseDeletePhoto = async (path: string) => {
   deleteObject(ref(storage, `images/${path}`)).then(() => {
      console.log("// File deleted successfully")
   }).catch((error) => {
      console.log("// Uh-oh, an error occurred!")
   });
}