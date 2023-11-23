import { Loyout } from "../../components/Loyout";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Modal } from "../../components/Modal";
import { Home } from "../Home/Home";
import { Page404 } from "../404";
import { UploadButton } from "../../components/UploadButton";
import { PostSection } from "../../components/PostSection";
import { CommentSection } from "../../components/CommentSection";

export const Post = () => {
    const postId = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: 'fetchPost',
        queryFn: () => fetch(`${process.env.REACT_APP_APIURL}/api/content/${postId.postId}`, { method: 'GET', credentials: 'include' }).then(res => res.json())
                            
    })

    if ( isLoading ) return <h1 className="flex justify-center items-center">Loading ...</h1>
    if ( isError ) return alert(isError);

    if ( data.msg === "Access Denied." ) return (
        <Loyout>
            <Home />
            <Modal post_redirection="true" />
        </Loyout>
    )

    if ( data.msg === "Invalid Post" ) return (
        <Loyout>
            <Page404 />
        </Loyout>
    )
    return (
        <Loyout>
            
            <div className="bg-slate-100 pt-20 flex flex-col items-center w-screen p-2 min-h-screen">
                <div className="flex flex-col gap-2 lg:w-[40%] ">
                    <UploadButton/>
                    <PostSection post={data.post}/>
                    <CommentSection comments={data.comments} post_id={data.post.post_id}/>     
                </div>
            </div>
        </Loyout>
        
            
        
    )
}