import { auth, db } from "../firebase";
import {
  collection,
  updateDoc,
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
}

export default new ChatDataService();