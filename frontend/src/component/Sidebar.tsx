import SidebarItem from "./SidebarItem";
import {Twitter,Youtube,Brain,LogOut} from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import {useNavigate} from "react-router-dom";
import useContentStore from "../store/useContentStore";

const Sidebar = () => {
  const {logout}=useAuthStore();
  const navigate=useNavigate();
  const {fetchTypeContent}=useContentStore();

  return (
    <div className='p-2 h-screen border-r border-gray-300'>
      <div className='h-full w-20 lg:w-64 transition-all duration-200 flex flex-col'>
        <div className='flex gap-2 p-2 items-center'>
          <span className='text-purple-600'>
            <Brain />
          </span>
          <h1 className='text-2xl hidden lg:block text-gray-800 font-semibold transition-all duration-200 '>Brainly</h1>
        </div>
        <div className='flex-col space-y-4 pl-6 pt-6 max-w-36'>
          <SidebarItem fetchTypeContent={fetchTypeContent} text="Twitter" icon={<Twitter />} />
          <SidebarItem fetchTypeContent={fetchTypeContent} text="YouTube" icon={<Youtube />} />
        </div>
        <div onClick={()=>{logout(navigate)}} className="p-2 mt-auto mb-3 text-gray-700 flex items-center space-x-2 cursor-pointer">
          <LogOut className="size-7" />
          <span className='hidden lg:block transition-all duration-200'>
            Logout
          </span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar