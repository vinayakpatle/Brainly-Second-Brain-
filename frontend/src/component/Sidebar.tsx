import SidebarItem from "./SidebarItem";
import {Twitter,Youtube,Brain} from "lucide-react";

const Sidebar = () => {
  return (
    <div className='p-2 h-screen border-r border-gray-300'>
      <div className='w-20 lg:w-64 transition-all duration-200 flex-col'>
        <div className='flex gap-2 p-2 items-center'>
          <span className='text-purple-600'>
            <Brain />
          </span>
          <h1 className='text-2xl hidden lg:block text-gray-800 font-semibold transition duration-200 '>Brainly</h1>
        </div>
        <div className='flex-col space-y-4 pl-6 pt-6 max-w-36'>
          <SidebarItem text="Twitter" icon={<Twitter />} />
          <SidebarItem text="YouTube" icon={<Youtube />} />
        </div>
      </div>
    </div>
  )
}

export default Sidebar