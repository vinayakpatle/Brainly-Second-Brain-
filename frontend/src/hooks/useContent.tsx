import {useState,useEffect} from 'react';
import axiosInstance from "../lib/axiosInstance";
import toast from 'react-hot-toast';

interface contentType{
    id: number;
    user_id?: number;
    title: string;
    link: string;
    type: "YouTube" | "Twitter";
    created_at?: string;
}

const useContent=()=>{
    const [contents,setContents]=useState<contentType[]>([]);
    const [isContentFetching,setIsContentFetching]=useState(false);
    console.log(contents);

    useEffect(()=>{
        const fetchContent=async()=>{
            setIsContentFetching(true);
            try{
                const token=localStorage.getItem("token");
                const headers=token ? {Authorization:token} : {};

                const res=await axiosInstance.get("/content/get",{headers});
                const extractContent=res.data.content;
                if(Array.isArray(extractContent)){
                    setContents(extractContent);
                }else{
                    setContents([]);
                }

            }catch(e: any){
                toast.error(e.response?.data?.message || "Something wrong in fetching contents");
            }finally{
                setIsContentFetching(false);
            }
        }
        fetchContent();
    },[])

    return {contents,isContentFetching};
}

export default useContent;