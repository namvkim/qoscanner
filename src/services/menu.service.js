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

const menuCollectionRef = doc(db, "restaurant","menu");
class MenuDataService {
  addMenus = (newMenu) => {
    return addDoc(menuCollectionRef, newMenu);
  };

  updateMenu = (id, updateMenu) => {
    const menuDoc = doc(db, "menu", id);
    return updateDoc(menuDoc, updateMenu);
  };

  deleteMenu= (id) => {
    const menuDoc = doc(db, "menu", id);
    return deleteDoc(menuDoc);
  };

  getAllMenus = () => {
    return getDocs(menuCollectionRef);
  };
  getMenu= (id) => {
    const menuDoc = doc(db, "menu", id);
    return getDoc(menuDoc);
  };
}

export default new MenuDataService();