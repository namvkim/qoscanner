import { auth, db } from "../firebase";
import {
  collection,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const resCollectionRef = collection(db, "restaurant");
class CategoryDataService {
  addCategories = (newCategory) => {
    const idRestaurant = auth.currentUser.uid; // lấy user id
    return addDoc(
      collection(resCollectionRef, idRestaurant, "category"),
      newCategory
    );
  };

  getCategory = (id) => {
    const idRestaurant = auth.currentUser.uid;
    const cateDoc = doc(
      collection(resCollectionRef, idRestaurant, "category"),
      id
    );
    return getDoc(cateDoc);
  };

  updateCategory = (newCategory) => {
    const { id, ...Category } = newCategory;
    const idRestaurant = auth.currentUser.uid;
    const cateDoc = doc(
      collection(resCollectionRef, idRestaurant, "category"),
      id
    );
    return updateDoc(cateDoc, Category);
  };

  deleteCategory = (id) => {
    const idRestaurant = auth.currentUser.uid;
    const cateDoc = doc(
      collection(resCollectionRef, idRestaurant, "category"),
      id
    );
    return deleteDoc(cateDoc);
  };
  deleteAllCategory = () => {
    const idRestaurant = auth.currentUser.uid;
    const cateDoc = doc(collection(resCollectionRef, idRestaurant, "category"));
    return deleteDoc(cateDoc);
  };
}
export default new CategoryDataService();
