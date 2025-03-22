import {ReactElement} from "react";
import useContentStore from "../store/useContentStore";

interface SidebarItemProps{
  fetchTypeContent:(type: "YouTube" | "Twitter")=>void;
  text: "YouTube" | "Twitter";
  icon: ReactElement;
}

const SidebarItem = ({fetchTypeContent,text,icon}: SidebarItemProps) => {
  const {typeOfContent}=useContentStore();

  function handleTypeContent(){
    useContentStore.setState({typeOfContent:text});
    fetchTypeContent(text);
  }

  return (
    <div onClick={handleTypeContent} className={`${typeOfContent===text ? "bg-gray-300" : ""} flex gap-2 items-center text-gray-700 cursor-pointer hover:bg-gray-300 rounded pl-4 py-2 transition-all duration-200`}>
      <span>
        {icon} 
      </span>
      <span className='hidden lg:block transition-all duration-200'>
        {text}
      </span>
    </div>
  )
}

export default SidebarItem