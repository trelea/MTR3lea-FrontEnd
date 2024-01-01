import { useState } from "react";
import { Link } from "react-router-dom";
import { UpdatePost } from "./UpdatePost";

export const PostOptions = ({ post_id, post_username, setPreviewPostOptions }) => {
    const [editPost, setEditPost] = useState(false);

    const HandleDeletePost = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_APIURL}/api/content/${post_id}`, { method: 'DELETE', credentials: 'include'})
            .then(res => res.json())
            .then(data => {
                console.log(post_username);
                if (data.msg === "Post Deleted") return window.location.href = `/user/${post_username}`;
                else return alert('Failed to delete this post.');
            })
    }

    return (
        <>
            {
                editPost && <UpdatePost setPreviewPostOptions={setPreviewPostOptions} post_id={post_id} editPost={editPost} setEditPost={setEditPost}/>
            }
            <div className="absolute right-0 top-8">
                <div className="border border-gray-300 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-xl bg-white">
                    <ul className="p-1 px-2">

                        <Link>
                            <li className="text-black hover:bg-slate-200 hover:rounded-lg font-normal text-base flex gap-2 items-center p-1 px-2"
                                onClick={() => setEditPost(!editPost)}>
                                <img className="aspect-square h-4 w-4" src="https://img.icons8.com/material-rounded/24/edit--v1.png" alt="edit--v1"/>
                                Edit Post
                            </li>
                        </Link>
                            
                        <Link>
                            <li className="text-red-600 hover:bg-slate-200 hover:rounded-lg font-normal text-base flex gap-2 items-center p-1 px-2"
                                onClick={e => HandleDeletePost(e)}>
                                <img className="aspect-square h-4 w-4" src="https://img.icons8.com/material-rounded/24/filled-trash.png" alt="filled-trash"/>
                                Delete Post 
                            </li>
                        </Link>
                        
                    </ul>
                </div>
            </div>
        </>
        
    )
}