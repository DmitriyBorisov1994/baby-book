import {
   ref,
   uploadBytes,
   getDownloadURL,
   listAll,
   list,
   deleteObject,
} from "firebase/storage";
import { storage } from "./../../firebase";

export const firebaseUploadPhoto = async (imageUpload: any, noteId: string) => {
   const imageRef = ref(storage, `images/${noteId}/${imageUpload.uid}`);
   uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
         console.log('Загружено! ' + url)
      });
   });
}

export const firebaseDownloadUrls = async (noteId: string) => {
   const response = await listAll(ref(storage, `images/${noteId}`))
   const urls = await Promise.all(response.items.map((item) => getDownloadURL(item)))
   return urls
}

export const firebaseDeletePhotosFolderbyNoteId = (noteId: string) => {
   deleteObject(ref(storage, `images/${noteId}`)).then(() => {
      console.log("// File deleted successfully")
   }).catch((error) => {
      console.log("// Uh-oh, an error occurred!")
   });
}