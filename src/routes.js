

import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Forgot from './screens/Forgot';

const routes = [
    {
      path: "/",
      exact: true,
      main: () => <Home />,
    },
    {
      path: "/login",
      exact: true,
      main: () => <Login />,
    },
    {
      path: "/signup",
      exact: true,
      main: () => <SignUp />,
    },
    {
      path: "/forgot",
      exact: true,
      main: () => <Forgot />,
    },
    
  ];
  

export default routes;