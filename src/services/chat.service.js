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

const messageCollectionRef = collection(db, "restaurant"); 
class ChatDataService {
//update status of Chat
  updateStatusChat = (id, update) => {
    const idRestaurant = auth.currentUser.uid;
    const chatDoc = doc(collection(messageCollectionRef, idRestaurant,'message'),id);
    return updateDoc(chatDoc, update);
  };
//update status of Order
  updateStatusOrder = (id, update) => {
    const idRestaurant = auth.currentUser.uid;
    const orderDoc = doc(collection(messageCollectionRef, idRestaurant,'order'),id);
    return updateDoc(orderDoc, update);
  };
  
  // addMessage = (newMessage) => {
  //   const idRestaurant = auth.currentUser.uid;
  //   return addDoc(collection(messageCollectionRef, idRestaurant,'message'), newMessage);
  // };

  // getMessage= (id) => {
  //   const idRestaurant = auth.currentUser.uid;
  //   return getDocs(collection(messageCollectionRef, idRestaurant,'message', id));
  // };
}

export default new ChatDataService();