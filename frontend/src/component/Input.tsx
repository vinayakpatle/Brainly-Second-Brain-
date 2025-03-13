interface InputProps{
    onChange?: (e: React.ChangeEvent<HTMLInputElement>)=>void;
    placeholder: string;
    type: string;
    ref?: any;
}

function Input({onChange,placeholder,ref,type}: InputProps){

    return <div className="p">
        <input ref={ref} type={type} placeholder={placeholder} onChange={onChange} className="px-4 py-2 border border-gray-500 rounded w-full"></input>
    </div>
}

export default Input;