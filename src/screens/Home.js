
import {  Link } from "react-router-dom";


const Home =()=> {
    return (
                <ul className=" ">
                    <li> <Link to="/">HOME </Link> </li>
                    <li> <Link to="/login">LOG IN</Link> </li>
                    <li> <Link to="/signup">SIGN UP</Link> </li>
                </ul>
    );
}

export default Home; 