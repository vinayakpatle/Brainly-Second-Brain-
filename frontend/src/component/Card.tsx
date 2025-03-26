import { Share, Delete, Twitter, Youtube } from "lucide-react";

interface CardProps {
  title: string;
  link: string;
  type: "Twitter" | "YouTube";
  deleteContent?:(content_id: number)=>void;
  content_id: number;
}

const Card = ({ title, link, type,deleteContent,content_id}: CardProps) => {

  return (
    <div className='bg-white p-4 rounded-md border border-gray-300 min-w-full sm:min-w-72 max-w-full sm:max-w-72 min-h-56 shadow-md hover:shadow-2xl hover:scale-105 transition-transform transform duration-200 ease-in-out'>
      <div className='flex justify-between items-center text-md'>
        <div className='flex gap-2 items-center'>
          {type === "YouTube" ? <Youtube className='size-4 text-gray-500' /> : <Twitter className='size-4 text-gray-500' />}
          {title}
        </div>
        <div className='flex gap-2 items-center text-gray-500'>
          <a href={link} target="_blank">
            <Share className='size-4 cursor-pointer'
            />
          </a>
          <Delete onClick={()=>{
              if(deleteContent && content_id) deleteContent(content_id);
              else console.error("deleteContent or content_id is undefined");
            }
          } className='size-4 cursor-pointer' />
        </div>
      </div>
      <div className='pt-4'>
        {type === "YouTube" && <iframe className='w-full' src={link.replace("watch?v=","embed/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

        {type === "Twitter" && <blockquote className="twitter-tweet">
          <a href={link.replace("x","twitter")}></a>
        </blockquote>}
      </div>
    </div>
  )
}

export default Card