import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Home = () => {
    const Signout = () => {
        signOut(auth).then(() => {
            console.log("sign out");
        }).catch((error) => {

        });
    }

    return (
        <div>
            <h1>hello {auth.currentUser.displayName}</h1>
            <button onClick={() => Signout()}>logout</button>
        </div>
    );
}

export default Home; 