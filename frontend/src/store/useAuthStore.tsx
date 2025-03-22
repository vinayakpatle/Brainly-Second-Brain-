import {create} from "zustand";
import axiosInstance from "../lib/axiosInstance";
import {toast} from "react-hot-toast";

interface DataType{
    username: string;
    password: string;
}

type useAuthStoreProps={
    authUser: authUserType | null;
    isSigningUp:boolean;
    isLoggingUp:boolean;
    isAuthChecking:boolean;
    signup:(Data: DataType,navigate:(path: string)=>void)=> void;
    signin:(Data: DataType,navigate:(path: string)=>void)=> void;
    logout:(navigate:(path: string)=>void)=> void;
    authCheck:()=>void;
}

interface authUserType{
    id: Number;
    username: String;
}

const useAuthStore=create<useAuthStoreProps>((set,get)=>({
    authUser: null,
    isSigningUp:false,
    isLoggingUp:false,
    isAuthChecking:true,

    signup:async(Data: DataType,navigate)=>{
        set({isSigningUp:true});
        try{
            await axiosInstance.post("/auth/signup",Data);
            toast.success("Account created successfully");
            navigate("/login");
        }catch(e: any){
            toast.error(e?.response?.data?.message);
        }finally{
            set({isSigningUp:false});
        }
    },

    signin:async(Data: DataType,navigate)=>{
        set({isLoggingUp:true});
        try{
            const res=await axiosInstance.post("/auth/login",Data);
            const jwt=res.data.token;
            set({authUser:res.data.user});
            localStorage.setItem("token",jwt);
            toast.success("Logged in successfully");
            navigate("/dashboard");
        }catch(e: any){
            toast.error(e?.response?.data?.message);
        }finally{
            set({isLoggingUp:false});
        }
    },

    logout:(navigate)=>{
        try{
            localStorage.removeItem("token");
            set({authUser:null});
            navigate("/login");
        }catch(e: any){
            toast.error(e?.response?.data?.message);
        }
    },

    authCheck:async()=>{
        try{
            const token=localStorage.getItem("token");
            const headers=token ? {Authorization:token} : {};
            const res=await axiosInstance.get("/auth/check",{headers});
            set({authUser:res.data.user});
        }catch(e: any){
            //toast.error(e?.response?.data?.message);
            set({authUser:null});
        }finally{
            set({isAuthChecking:false});
        }
    }

}))

export default useAuthStore;