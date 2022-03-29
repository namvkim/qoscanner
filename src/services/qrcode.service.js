import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
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
}

export default new QrCodeDataService();