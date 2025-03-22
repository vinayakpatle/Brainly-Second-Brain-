import {User,Lock} from "lucide-react";
import Input from "../component/Input";
import Button from "../component/Button";
import {useRef,useState} from "react";
import useAuthStore from "../store/useAuthStore";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";


const Signup = () => {
    const {authUser,isSigningUp,signup}=useAuthStore();
    const [Data,setData]=useState({
      username:"",
      password:""
    })
    const navigate=useNavigate();

    const usernameRef=useRef<HTMLInputElement>(null);
    const passwordRef=useRef<HTMLInputElement>(null);

    function usernameOnChange(e: React.ChangeEvent<HTMLInputElement>){
      setData({...Data,username:e.target.value});
    }

    function passwordOnChange(e: React.ChangeEvent<HTMLInputElement>){
      setData({...Data,password:e.target.value});
    }

    function formValidate(){
      if(!Data.username.trim()) return toast.error("Username is required");
      if(!Data.password.trim()) return toast.error("Password is required");
      if(Data.password.length<6) return toast.error("Password must be at least 6 character");
      return true;
    }

    function signupHandler(e: React.FormEvent){
      e.preventDefault();
      const success: boolean | string=formValidate();

      if(success===true) signup(Data,navigate);
    }

  return (
    <div  className='w-screen h-screen bg-gray-300 flex justify-center items-center'>
      <div className='min-w-48 bg-white p-8 flex-col space-y-4 rounded-lg'>
          <Input ref={usernameRef} onChange={usernameOnChange} type="text" placeholder="Username" />
          <Input ref={passwordRef} onChange={passwordOnChange} type="password" placeholder="Password" />
          <div className='flex justify-center'>
              <Button onChange={signupHandler} loading={isSigningUp} text="Signup" variant="primary" fullWidth={true} />
          </div>
      </div>
    </div>
  )
}

export default Signup