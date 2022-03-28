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
    const idRestaurant = auth.currentUser.uid; // lấy user id
    return addDoc(collection(menuCollectionRef, idRestaurant, "menu"), newMenu);
  };

  updateMenu = (id, updateMenu) => {
    const idRestaurant = auth.currentUser.uid;
    const menuDoc = doc(
      collection(menuCollectionRef, idRestaurant, "menu"),
      id
    );
    return updateDoc(menuDoc, updateMenu);
  };
  deleteMenu = (id) => {
    const idRestaurant = auth.currentUser.uid;
    const menuDoc = doc(
      collection(menuCollectionRef, idRestaurant, "menu"),
      id
    );
    return deleteDoc(menuDoc);
  };

  addCategories = (newCategory) => {
    const idRestaurant = auth.currentUser.uid; // lấy user id
    return addDoc(
      collection(menuCollectionRef, idRestaurant, "category"),
      newCategory
    );
  };

  updateCategory = (newCategory) => {
    const { id, ...Category } = newCategory;
    const idRestaurant = auth.currentUser.uid;
    const cateDoc = doc(
      collection(menuCollectionRef, idRestaurant, "category"),
      id
    );
    return updateDoc(cateDoc, Category);
  };

  deleteCategory = (id) => {
    const idRestaurant = auth.currentUser.uid;
    const cateDoc = doc(
      collection(menuCollectionRef, idRestaurant, "category"),
      id
    );
    return deleteDoc(cateDoc);
  };
  deleteAllCategory = () => {
    const idRestaurant = auth.currentUser.uid;
    const cateDoc = doc(
      collection(menuCollectionRef, idRestaurant, "category")
    );
    return deleteDoc(cateDoc);
  };

  getAllMenus = () => {
    return getDocs(collection(menuCollectionRef, "menu"));
  };
  getMenu = (id) => {
    const idRestaurant = auth.currentUser.uid;
    const menuDoc = doc(
      collection(menuCollectionRef, idRestaurant, "menu"),
      id
    );
    return getDoc(menuDoc);
  };
  getCategory = (id) => {
    const idRestaurant = auth.currentUser.uid;
    const cateDoc = doc(
      collection(menuCollectionRef, idRestaurant, "category"),
      id
    );
    return getDoc(cateDoc);
  };
}

export default new MenuDataService();
