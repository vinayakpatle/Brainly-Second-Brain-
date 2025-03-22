import {useEffect} from "react";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {Toaster} from "react-hot-toast";
import ErrorPage from "./component/ErrorPage";
import useAuthStore from "./store/useAuthStore";
import { ImSpinner9 } from "react-icons/im";

function App(){
  const {authUser,authCheck,isAuthChecking}=useAuthStore();

  useEffect(()=>{
    authCheck();
  },[authCheck]);

  if(isAuthChecking && authUser){

    return <div className="h-screen bg-white flex justify-center items-center">
      <ImSpinner9 className="size-10 text-gray-800 animate-spin"/>
    </div>
  }


  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/dashboard" element={authUser ? <Dashboard/> : <Signin />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
