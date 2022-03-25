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
class QrCodeDataService {
  addQrCode = (newQrCode) => {
    const idRestaurant = auth.currentUser.uid;
    return addDoc(collection(qrCodeCollectionRef, idRestaurant,'qrCode'), newQrCode);
  };

  deleteQrCode = (id) => {
    const idRestaurant = auth.currentUser.uid;
    const qrDoc = doc(collection(qrCodeCollectionRef, idRestaurant, 'qrCode'), id);
    return deleteDoc(qrDoc);
  };

  // updateQrCode = (id, updateQrCode) => {
  //   const idRestaurant = auth.currentUser.uid;
  //   return updateDoc(collection(qrCodeCollectionRef, idRestaurant,'qrCode'), updateQrCode, id);
  // };

  // getAllQrCodes = () => {
  //   const idRestaurant = auth.currentUser.uid;
  //   return getDocs(collection(qrCodeCollectionRef, idRestaurant,'qrCode'));
  // };

  // getQrCode= (id) => {
  //   const idRestaurant = auth.currentUser.uid;
  //   const qrDoc = doc(collection(qrCodeCollectionRef, idRestaurant, 'qrCode'), id);
  //   return getDoc(qrDoc);
  // };
}

export default new QrCodeDataService();