import { auth, db } from "../firebase";
import {
  collection,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
} from "firebase/firestore";

const qrCodeCollectionRef = collection(db, "restaurant"); 
class ChatDataService {
  addMessage = (newMessage) => {
    const idRestaurant = auth.currentUser.uid;
    return addDoc(collection(qrCodeCollectionRef, idRestaurant,'message'), newMessage);
  };

  updateMessage = (id, updateMessage) => {
    const idRestaurant = auth.currentUser.uid;
    return updateDoc(collection(qrCodeCollectionRef, idRestaurant,'message'), updateMessage, id)
  };

//   updateQrCode = (id, updateQrCode) => {
//     const idRestaurant = auth.currentUser.uid;
//     return updateDoc(collection(qrCodeCollectionRef, idRestaurant,'message'), updateQrCode, id);
//   };

//   deleteQrCode = (id) => {
//     const idRestaurant = auth.currentUser.uid;
//     const qrDoc = doc(collection(qrCodeCollectionRef, idRestaurant, 'message'), id);
//     return deleteDoc(qrDoc);
//   };

//   getAllQrCodes = () => {
//     const idRestaurant = auth.currentUser.uid;
//     return getDocs(collection(qrCodeCollectionRef, idRestaurant,'message'));
//   };

//   getQrCode= (id) => {
//     const idRestaurant = auth.currentUser.uid;
//     const qrDoc = doc(collection(qrCodeCollectionRef, idRestaurant, 'message'), id);
//     return getDoc(qrDoc);
//   };
}

export default new ChatDataService();