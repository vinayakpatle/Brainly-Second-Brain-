import {useState,useEffect} from "react";
import Button from "../component/Button";
import Card from "../component/Card";
import Sidebar from "../component/Sidebar";
import CreateContentModel from "../component/CreateContentModel";
import { Plus,Share } from "lucide-react";
import useContentStore from "../store/useContentStore";
import useAuthStore from "../store/useAuthStore";



function Dashboard() {
  //const [modelOpen,setModelOpen]=useState(false);
  const {contents,isContentFetching,fetchContent,deleteContent,toggleAddContent,isAddContentOpen}=useContentStore();

  useEffect(()=>{
    fetchContent();
  },[]);

  // function onClose(){
  //   setModelOpen(false);
  // }

  if(isContentFetching){
    return (
      <div className='flex'>
        <Sidebar />
        <div className=' flex-1 bg-gray-200 min-h-screen'>
          <CreateContentModel onClose={toggleAddContent} open={isAddContentOpen} />
          <div className='bg-gradient-to-b from-teal-500 to-green-400 shadow-sm'>
            <div className='flex p-5 justify-between items-center'>
              <h1 className='text-3xl text-gray-800 font-bold items-center'>All Notes</h1>
              <div className='flex items-center gap-2'>
                <Button variant="secondary" text="Share" startIcon={<Share/>} />
                <Button onChange={()=>toggleAddContent()} variant="primary" text="Add content" startIcon={<Plus/>} />
              </div>
            </div>
          </div>
          <div className='p-4 pt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
            <h1 className='text-4xl text-gray-800 font-semibold'>Content is loading</h1>
          </div>
        </div>
      </div>
      )
    }

    return (
      <div className='flex'>
        <Sidebar />
        <div className=' flex-1 bg-gray-200 min-h-screen'>
          <CreateContentModel onClose={toggleAddContent} open={isAddContentOpen} />
          <div className='bg-gradient-to-b from-teal-500 to-green-400 shadow-sm'>
            <div className='flex p-5 justify-between items-center'>
              <h1 className='text-3xl text-gray-800 font-bold items-center'>All Notes</h1>
              <div className='flex items-center gap-2'>
                <Button variant="secondary" text="Share" startIcon={<Share/>} />
                <Button onChange={()=>toggleAddContent()} variant="primary" text="Add content" startIcon={<Plus/>} />
              </div>
            </div>
          </div>
          <div className='p-4 pt-4 max-h-screen h-auto overflow-y-scroll grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
            {contents.map((content,idx)=>(
                <span key={idx}>
                  <Card 
                    title={content.title}
                    type={content.type} 
                    link={content.link}
                    deleteContent={deleteContent}
                    content_id={content?.id}
                  />
                </span>
              ))}
          </div>
        </div>
      </div>
  )
}

export default Dashboard;
