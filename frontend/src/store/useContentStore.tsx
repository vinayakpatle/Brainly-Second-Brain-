import {create} from "zustand";
import axiosInstance from "../lib/axiosInstance";
import {toast} from "react-hot-toast";

interface contentType{
    id: number;
    user_id: number;
    title: string;
    link: string;
    type: "YouTube" | "Twitter";
    created_at: string;
}

interface contentCreatingType{
    title: string;
    link: string;
    type: string;
}


interface useContentStoreProps{
    contents: contentType[];
    typeOfContent:null | "YouTube" | "Twitter";
    isContentCreating: boolean;
    isContentFetching: boolean;
    isAddContentOpen: boolean;
    createContent: (content: contentCreatingType)=>void;
    fetchContent:()=>void;
    fetchTypeContent:(type: "YouTube" | "Twitter")=>void;
    deleteContent:(content_id: number)=>void;
    toggleAddContent:()=>void;

}

const useContentStore=create<useContentStoreProps>((set,get)=>({
    contents:[],
    typeOfContent:null,
    isContentCreating: false,
    isContentFetching:false,
    isAddContentOpen:false,

    createContent:async(Content: contentCreatingType)=>{
        set({isContentCreating:true});
        try{
            const res=await axiosInstance.post("/content/create",
                Content,
                {
                    "headers":{
                        "Authorization":localStorage.getItem("token")
                    }
                }
            )
            if(get().typeOfContent){
                if(get().typeOfContent===res.data.content.type){
                    set((state)=>({
                        ...state,
                        contents:[...state.contents,res.data.content]
                    }))
                }
            }else{
                set((state)=>({
                    ...state,
                    contents:[...state.contents,res.data.content]
                }))
            }
            set((state)=>({isAddContentOpen:!state.isAddContentOpen}));
            toast.success("Content created successfully");

        }catch(e: any){
            toast.error(e?.response?.data?.message);
        }finally{
            set({isContentCreating:false});
        }
    },

    fetchContent:async()=>{
        set({isContentFetching:true});
        try{
            const token=localStorage.getItem("token");
            const headers=token ? {Authorization:token} : {};
            const res=await axiosInstance.get("/content/get",{headers});
            set({contents:res.data.contents});
        }catch(e: any){
            toast.error(e?.response?.data?.message);
        }finally{
            set({isContentFetching:false});
        }
    },

    fetchTypeContent:async(type: "YouTube" | "Twitter")=>{

        set({isContentFetching:true});
        try{
            const token=localStorage.getItem("token");
            const headers=token ? {Authorization:token} : {};
            const typeContents=await axiosInstance.get(`/content/get/${type}`,{headers});
            set({contents:typeContents.data.contents});

        }catch(e: any){
            toast.error(e?.response?.data?.message);
        }finally{
            set({isContentFetching:false})
        }
    },

    deleteContent:async(content_id: number)=>{
        try{
            const token=localStorage.getItem("token");
            const headers=token? {Authorization:token} : {};
            const res=await axiosInstance.delete(`/content/delete/${content_id}`,{headers});

            set((state)=>({contents:state.contents.filter(content=>content.id!==content_id)}));
            toast.success(res.data.message);
        }catch(e: any){
            toast.error(e.response?.data?.message);
        }
    },

    toggleAddContent:()=>(
        set((state)=>({isAddContentOpen:!state.isAddContentOpen}))
    )
}))

export default useContentStore;