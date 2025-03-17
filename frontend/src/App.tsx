import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {Toaster} from "react-hot-toast";
import ErrorPage from "./component/ErrorPage";
import useAuthStore from "./store/useAuthStore";

function App(){
  const {authUser}=useAuthStore();

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
