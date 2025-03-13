import {X} from "lucide-react";
import Button from "./Button";
import Input from "./Input";
import {useState,useRef} from "react";
import {toast} from "react-hot-toast";
import useContentStore from "../store/useContentStore";

interface CreateContentModelProps{
    onClose: ()=>void;
    open: boolean;
}

enum contentType{
    YouTube="YouTube",
    Twitter="Twitter"
}

const CreateContentModel = ({onClose,open}: CreateContentModelProps) => {
    const {isContentCreating,createContent}=useContentStore();
    const titleRef=useRef<HTMLInputElement>(null);
    const linkRef=useRef<HTMLInputElement>(null);
    const [type,setType]=useState("");
    const [content,setContent]=useState({
        title:"",
        link:""
    })

    function titleOnChange(e: React.ChangeEvent<HTMLInputElement>){
        setContent({...content,title:e.target?.value})
    }

    function linkOnChange(e: React.ChangeEvent<HTMLInputElement>){
        setContent({...content,link:e.target?.value})
    }

    function contentValidate(){

        if(!content.title.trim()) return toast.error("Title is required");
        if(!content.link.trim()) return toast.error("Link is required");
        if(type==="") return toast.error("Type is required");
        return true;
    }

    function contentHandle(e: React.FormEvent){
        e.preventDefault();
        const success: boolean| string=contentValidate();
        const Content={
            title:content.title,
            link:content.link,
            type:type
        }
        if(success===true) createContent(Content);
    }


  return (
    <div>
        {open && <div onClick={onClose} className='w-screen h-screen fixed top-0 left-0 bg-slate-500 bg-opacity-60 flex justify-center items-center'> 
            <div onClick={(e)=>{e.stopPropagation()}} className='bg-white w-72 opacity-100 p-4 rounded-md shadow-md'>
                <div className='flex-col space-y-4'>
                    <div className='flex justify-end'>
                        <div onClick={onClose} className="cursor-pointer">
                            <X />
                        </div>    
                    </div>  
                    <div className="flex-col space-y-4">
                        <Input onChange={titleOnChange} ref={titleRef} type="text" placeholder="Title" />
                        <Input onChange={linkOnChange} ref={linkRef} type="text" placeholder="Link" />
                    </div>
                    <div className="flex-col space-y-2">
                        <h2 className="text-gray-800 font-normal text-sm items-center">Type</h2>
                        <div className='flex gap-2 justify-center'>
                            <span onClick={()=>{setType(contentType.YouTube)}}>
                                <Button text={contentType.YouTube} variant={type===contentType.YouTube ? "primary" : "secondary"} />
                            </span>
                            <span onClick={()=>{setType(contentType.Twitter)}}>
                                <Button text={contentType.Twitter} variant={type===contentType.Twitter ? "primary" : "secondary"} />
                            </span>
                        </div>   
                    </div>    
                    <div className='flex justify-center'>
                        <Button onChange={contentHandle} loading={isContentCreating} variant="primary" text="Submit"/>
                    </div>       
                </div>    
            </div>
        </div>}
    </div>
  )
}

export default CreateContentModel