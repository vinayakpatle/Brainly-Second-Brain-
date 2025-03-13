import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {Toaster} from "react-hot-toast";

function App(){

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
