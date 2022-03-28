import { auth, db } from "../firebase";
import { collection, addDoc, setDoc, updateDoc, doc } from "firebase/firestore";

const infoCollectionRef = collection(db, "restaurant");
class InfoDataService {
  addInfo = (newInfo) => {
    const idRestaurant = auth.currentUser.uid; // lấy user id
    const infoDoc = doc(infoCollectionRef, idRestaurant);
    return setDoc(infoDoc, newInfo);
  };

  updateInfo = (updateMenu) => {
    const idRestaurant = auth.currentUser.uid;
    const menuDoc = doc(infoCollectionRef, idRestaurant);
    return updateDoc(menuDoc, updateMenu);
  };
}

export default new InfoDataService();
