import{ ReactElement } from 'react';
import {Loader} from "lucide-react";

interface ButtonProps{
    variant: "primary" | "secondary";
    text: string;
    startIcon?: ReactElement;
    onChange?: (e: React.FormEvent)=> void;
    fullWidth?: boolean;
    loading?: boolean;
}

const variantClasses={
  "primary":"bg-purple-600 text-white",
  "secondary":"bg-purple-200 text-purple-500"
}

const defaultStyles="px-4 py-2 flex items-center gap-2 rounded-md font-normal"

const Button = ({variant,text,startIcon,onChange,fullWidth,loading}: ButtonProps) => {
    
  return (
    <button disabled={loading} onClick={onChange} className={`${variantClasses[variant]} ${defaultStyles} flex justify-center ${fullWidth ? "w-full " : ""} ${loading ? "opacity-60" : ""} `}>
      {startIcon && <span className='size-4 flex items-center'>{startIcon}</span>}
      {loading ? <Loader className="animate-spin" /> : <span className={`${text==="Submit" || "Signup" || "Signin" ? "block" :" hidden md:block"}  transition-all duration-200`}>{text}</span>}
    </button>
  )
}

export default Button