import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import { UserContext } from "./Loyout";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ShareBtn } from "./ShareBtn";
import { PostOptions } from "./PostOptions";

export const CardPost = ({ post, postOptions, setAuthenticated }) => {
    const { data } = useContext(UserContext);
    const [copied, setCopied] = useState(false);
    const [previewPostOptions, setPreviewPostOptions] = useState(false);
    const [isAuthenticated, setAuthenticates] = useState(false);

    const [likeStatus, setLikeStatus] = useState({
        userLiked: post.post_likes.includes(data.user_name),
        Likes: post.post_likes.length
    })

    
    const HandleLikePost = (e) => {
        e.preventDefault()
        fetch(`${process.env.REACT_APP_APIURL}/api/content/like/${post.post_id}`, { method: 'PUT', credentials: 'include' })
            .then(res => res.json())
            .then(status => {
                if (status.msg) return window.location.href = `/post/${post.post_id}`;
                if (status.likePost) { setLikeStatus({ userLiked: !likeStatus.userLiked, Likes: likeStatus.Likes + 1 })}
                if (status.unlikePost) { setLikeStatus({ userLiked: !likeStatus.userLiked, Likes: likeStatus.Likes - 1 }) }   
            })
    }

    const HandleCopyTime = () => {
        setCopied(true);
        setTimeout(() => { setCopied(false) }, 3000);
    }
    
    return (
        <>
            { 
                copied && <ShareBtn link={`${window.location.origin}/post/${post.post_id}`}/>
            }
            <div className="w-full bg-white rounded-lg border border-gray-300 p-4 hover:border-gray-400 hover:bg-gray-50">
  
                <div className="relative flex justify-between">
                    <div className="flex gap-2 items-center">
                        {/**onClick={() => window.location.href = `/user/${post.user_name}`} */}
                        <Link to={ data?.user_name ? `/user/${post.user_name}` : setAuthenticated(false) } className="flex gap-2 items-center" reloadDocument preventScrollReset>
                            <img className="rounded-full object-cover h-6 w-6" src={`${process.env.REACT_APP_APIURL}${post.user_thumbnail}`} alt="" />
                            <h1 className="font-semibold text-sm text-gray-700 hover:underline hover:text-blue-700">m/{post.user_name}</h1>
                        </Link>
                        <h1 className="font-semibold text-xs text-gray-600">Posted at: {(new Date(post.post_created_at).toLocaleString()).split(",")[0]}</h1>
                    </div>
                    {
                        (data.user_name === post.user_name && postOptions) && 
                            <button className="p-1 px-2 rounded-full hover:bg-slate-200"
                                onClick={() => setPreviewPostOptions(!previewPostOptions)}
                                onBlur={(e) => {
                                    console.log(e.relatedTarget)
                                    if (e.relatedTarget === null) return setPreviewPostOptions(false);
                                    if (e.relatedTarget.attributes[0].value === `/user/${data.user_name}`) return setPreviewPostOptions(true);
                                    return setPreviewPostOptions(false);
                                }}>
                                <img className="h-4 w-4 aspect-square" src="https://img.icons8.com/material-rounded/24/menu-2.png" alt="menu-2"/>
                            </button> 
                    }
                    {
                        previewPostOptions && <PostOptions setPreviewPostOptions={setPreviewPostOptions} post_id={post.post_id} post_username={post.user_name}/>
                    }
                </div>

                {/**onClick={() => window.location.href = `/post/${post.post_id}`} */}
                <Link to={ data?.user_name && `/post/${post.post_id}`} reloadDocument preventScrollReset>
                    <div className="pt-2">
                        <h1 className="font-bold text-lg leading-tight">{post.post_title}</h1>
                        <h1 className="font-normal text-sm text-gray-700 pt-1 w-fit hover:underline hover:text-blue-700">Click to read more ...</h1>
                        { post.post_thumbnail !== "/images/postsThumbnails/defaultPostThumbnail.jpg" && 
                            <div className="flex justify-center items-center">
                                <img className="mt-4 rounded-lg object-cover max-h-[500px] min-h-[100px]" src={`${process.env.REACT_APP_APIURL}${post.post_thumbnail}`} alt="" />
                            </div>
                        }
                        
                    </div>
                </Link>
                

                <div className="flex gap-2 items-center mt-4">
                    <div className="border border-gray-400 rounded-xl px-2 py-1 flex items-center gap-2 hover:bg-gray-100" 
                    onClick={(e) => {HandleLikePost(e)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill={ likeStatus.userLiked ? "black" : "none" } viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                        </svg>
                        <p className="font-medium">{likeStatus.Likes}</p>
                    </div>

                    {/**onClick={() => window.location.href = `/post/${post.post_id}`} */}
                    <Link to={ data?.user_name ? `/post/${post.post_id}`: } reloadDocument preventScrollReset>
                        <div className="border border-gray-400 rounded-xl px-2 py-1 flex items-center gap-2 hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            </svg>
                            <p className="font-medium">{post.post_comments}</p>   
                        </div>
                    </Link>

                    <CopyToClipboard text={`${window.location.origin}/post/${post.post_id}`} onCopy={() => HandleCopyTime()}>
                        <div className="border border-gray-400 rounded-xl px-2 py-1 flex items-center gap-2 hover:bg-gray-100"> 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                            <p className="font-medium">Share</p>
                        </div>
                    </CopyToClipboard>
                    
                </div>
            </div>
        </>
    )
    
}


