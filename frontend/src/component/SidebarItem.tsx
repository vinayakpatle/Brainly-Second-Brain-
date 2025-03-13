import {ReactElement} from "react";

interface SidebarItemProps{
  text: string;
  icon: ReactElement;
}

const SidebarItem = ({text,icon}: SidebarItemProps) => {

  return (
    <div className="flex gap-2 items-center text-gray-700 cursor-pointer hover:bg-gray-300 rounded pl-4 py-2 transition-all duration-200">
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