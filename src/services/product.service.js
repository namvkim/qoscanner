import { db } from "../firebase";
import {
  collection,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const productCollectionRef = collection(db, "products");
class ProductDataService {
  addProducts = (newProduct) => {
    return addDoc(productCollectionRef, newProduct);
  };

  updateProduct = (id, updateProduct) => {
    const productDoc = doc(db, "products", id);
    return updateDoc(productDoc, updateProduct);
  };

  deleteProduct= (id) => {
    const productDoc = doc(db, "products", id);
    return deleteDoc(productDoc);
  };


  getProduct= (id) => {
    const productDoc = doc(db, "products", id);
    return getDoc(productDoc);
  };
}

export default new ProductDataService();