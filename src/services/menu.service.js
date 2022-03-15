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


const menuCollectionRef = collection(db, "restaurant"); 
class MenuDataService {
  addMenus = (newMenu) => {
    const idRestaurant = auth.currentUser.uid;
    return addDoc(collection(menuCollectionRef, idRestaurant,'menu'), newMenu);
  };

  updateMenu = (id, updateMenu) => {
    const menuDoc = doc(db, "restaurant", "jicVmZc9Iu83NiLVHmFy", id);
    return updateDoc(menuDoc, updateMenu);
  };

  deleteMenu = (id) => {
    const menuDoc = doc(collection(menuCollectionRef, 'menu'), id);
    return deleteDoc(menuDoc);
  };

  getAllMenus = () => {
    return getDocs(collection(menuCollectionRef, 'menu'));
  };
  getMenu= (id) => {
    const menuDoc = doc(db, "restaurant", "jicVmZc9Iu83NiLVHmFy", id);
    return getDoc(menuDoc);
  };

  getCategory = () => {
    const categoryDoc = doc(db, "restaurant", "jicVmZc9Iu83NiLVHmFy", );
    return getDoc(categoryDoc);
  };

}

export default new MenuDataService();