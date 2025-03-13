import {Request, Response} from 'express';
import pgClient from "../lib/db";
import random from "../lib/random";

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

        const createContentQuery="INSERT INTO content(title,link,user_id,type) VALUES($1,$2,$3,$4) RETURNING *";
        const response=await pgClient.query(createContentQuery,[title,link,user_id,type]);
        const newContent=response.rows[0];

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

        const getContentQuery="SELECT users.id,users.username,content.id,content.title,content.link,content.type,content.created_at FROM users JOIN content ON users.id=content.user_id WHERE users.id=$1";
        const response=await pgClient.query(getContentQuery,[user_id]);
        const content=response.rows;

        res.status(200).json({content:content});
    }catch(e: any){
        console.log("Error in getContent controller",e.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export const deleteContent=async(req:Request, res:Response): Promise<void>=>{
    const content_id=req.params.id;

    try{
        const user_id=(req as any).user.id;
        const deleteContentQuery="DELETE FROM content WHERE id=$1 AND user_id=$2 RETURNING *";
        const response=await pgClient.query(deleteContentQuery,[content_id,user_id]);
        const deletedContent=response.rows[0];

        if(!deletedContent){
            res.status(404).json({message:"Content not get deleted"});
            return ;
        }

        res.status(200).json({message:"Content deleted successfully",content:deletedContent});
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

            const isHashExistQuery="SELECT * FROM shareable_links WHERE user_id=$1";
            const response=await pgClient.query(isHashExistQuery,[user_id]);
            const shareableLink=response.rows[0];

            if(shareableLink){
                res.status(400).json({hash:shareableLink.hash});
                return ;
            }

            const hash=random(10);
            const createShareableLinkQuery="INSERT INTO shareable_links(user_id,hash) VALUES($1,$2)";
            await pgClient.query(createShareableLinkQuery,[user_id,hash]);

            res.status(200).json({hash:hash});
            return ;

        }else{

            const isHashExistQuery="SELECT * FROM shareable_links WHERE user_id=$1";
            const response=await pgClient.query(isHashExistQuery,[user_id]);
        
            if(response.rows.length===0){
                res.status(404).json({message:"Hash already removed"});
                return ;
            }
            
            const deleteShareableLinkQuery="DELETE FROM shareable_links WHERE user_id=$1";
            await pgClient.query(deleteShareableLinkQuery,[user_id])

            res.status(200).json({message:"Hash romoved successfully"});
        }

    }catch(e: any){
        console.log("Error in share controller",e.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export const shareLink=async(req: Request, res: Response)=>{
    const hash=req.params.shareLink;

    try{
        const isHashExistQuery="SELECT * FROM shareable_links WHERE hash=$1";
        const response=await pgClient.query(isHashExistQuery,[hash]);
        const shareableLink=response.rows[0];

        if(!shareableLink){
            res.status(404).json({message:"Invalid link"});
            return ;
        }

        const user_id=shareableLink.user_id;

        const getContentAndUserQuery="SELECT users.id,users.username,content.id,content.title,content.link,content.created_at FROM users JOIN content ON users.id=content.user_id WHERE users.id=$1";
        const response2=await pgClient.query(getContentAndUserQuery,[user_id]);
        const content=response2.rows;
        if(!content){
            res.status(404).json({message:"No content found"});
            return ;
        }

        res.status(200).json({content:content});

    }catch(e: any){
        console.log("Error in shareLink controller",e.message);
        res.status(500).json({message:"Internal server error"});
    }
}