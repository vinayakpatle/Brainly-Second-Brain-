import {Request, Response} from 'express';
import {PrismaClient} from "@prisma/client";
import random from "../lib/random";

const client=new PrismaClient();

export const createContent=async (req:Request, res:Response): Promise<void>=>{
    const title=req.body.title;
    const link=req.body.link;
    const type=req.body.type;

    try{
        if(!title || !link || !type){
            res.status(400).json({message:"Please fill all fields"});
            return ;
        }

        const user_id=(req as any).user.id;

        const newContent=await client.content.create({
            data:{
                title:title,
                link:link,
                user_id:user_id,
                type:type
            },
            select:{
                id:true,
                user_id:true,
                title:true,
                link:true,
                type:true,
                created_at:true
            }
        })

        if(!newContent){
            res.status(500).json({message:"Error in creating content"});
            return ;
        }

        res.status(201).json({message:"Content created successfully",content:newContent});

    }catch(e: any){
        console.log("Error in createContent controller",e.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export const getContent=async(req:Request, res:Response): Promise<void>=>{
    try{
        const user_id=(req as any).user.id;

        const contents=await client.content.findMany({
            where:{
                user_id:user_id
            },
            select:{
                id:true,
                user_id:true,
                title:true,
                link:true,
                type:true,
                created_at:true
            }
        })

        res.status(200).json({contents:contents});
    }catch(e: any){
        console.log("Error in getContent controller",e.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export const deleteContent=async(req:Request, res:Response): Promise<void>=>{
    const content_id=req.params.id;

    try{
        const user_id=(req as any).user.id;
        const deletedContent=await client.content.delete({
            where:{
                id:Number(content_id),
                user_id:user_id
            }
        })

        if(!deletedContent){
            res.status(404).json({message:"Content not get deleted"});
            return ;
        }

        res.status(200).json({message:"Content deleted successfully"});
    }catch(e: any){
        console.log('Error in deleteContent controller',e.message);
        res.status(500).json({message:"Internal server error"});
    }

}

export const share=async(req: Request, res: Response): Promise<void>=>{

    try{
        const share: boolean=req.body.share;
        const user_id=(req as any).user.id;

        if(share){

            const hashExist=await client.shareable_links.findUnique({
                where:{
                    user_id:user_id
                }
            })

            if(hashExist){
                res.status(400).json({hash:hashExist.hash});
                return ;
            }

            const hash=random(10);
            await client.shareable_links.create({
                data:{
                    user_id:user_id,
                    hash:hash
                }
            })

            res.status(200).json({hash:hash});
            return ;

        }else{
            const hashExist=await client.shareable_links.findUnique({
                where:{
                    user_id:user_id
                }
            })
        
            if(hashExist?.hash?.length===0){
                res.status(404).json({message:"Hash already removed"});
                return ;
            }
            
            await client.shareable_links.delete({
                where:{
                    user_id:user_id
                }
            })

            res.status(200).json({message:"Hash romoved successfully"});
        }

    }catch(e: any){
        console.log("Error in share controller",e.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export const shareLink=async(req: Request, res: Response)=>{
    // const hash=req.params.shareLink;

    // try{
    //     const isHashExistQuery="SELECT * FROM shareable_links WHERE hash=$1";
    //     const response=await pgClient.query(isHashExistQuery,[hash]);
    //     const shareableLink=response.rows[0];

    //     if(!shareableLink){
    //         res.status(404).json({message:"Invalid link"});
    //         return ;
    //     }

    //     const user_id=shareableLink.user_id;

    //     const getContentAndUserQuery="SELECT users.id,users.username,content.id,content.title,content.link,content.created_at FROM users JOIN content ON users.id=content.user_id WHERE users.id=$1";
    //     const response2=await pgClient.query(getContentAndUserQuery,[user_id]);
    //     const content=response2.rows;
    //     if(!content){
    //         res.status(404).json({message:"No content found"});
    //         return ;
    //     }

    //     res.status(200).json({content:content});

    // }catch(e: any){
    //     console.log("Error in shareLink controller",e.message);
    //     res.status(500).json({message:"Internal server error"});
    // }
}