import { db } from "../firebase";
import {
  collection,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
} from "firebase/firestore";

const qrCodeCollectionRef = collection(db, "restaurant", "JfxhZ1Tdn8q0JLZm1JvL", "qrCode");
class QrCodeDataService {
  addQrCode = (newQrCode) => {
    return addDoc(qrCodeCollectionRef, newQrCode);
  };

  updateQrCode = (id, updateQrCode) => {
    const qrDoc = doc(db, "restaurant", "JfxhZ1Tdn8q0JLZm1JvL", "qrCode", id);
    return updateDoc(qrDoc, updateQrCode);
  };

  deleteQrCode = (id) => {
    const qrCodeDoc = doc(db, "restaurant", "JfxhZ1Tdn8q0JLZm1JvL","qrCode", id);
    return deleteDoc(qrCodeDoc);
  };

  // getAllMenus = () => {
  //   return getDocs(menuCollectionRef);
  // };
  // getMenu= (id) => {
  //   const menuDoc = doc(db, "restaurant", "JfxhZ1Tdn8q0JLZm1JvL", "menu", id);
  //   return getDoc(menuDoc);
  // };
}

export default new QrCodeDataService();