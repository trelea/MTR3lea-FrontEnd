import { useState, useEffect, } from "react";
import { Loyout } from "../../components/Loyout";
import { CardPost } from "../../components/CardPost";
import { UploadButton } from "../../components/UploadButton.jsx";

export const Home = () => {
    const [page,  setPage ] = useState(1);
    const [limit, setLimit] = useState(20);
    const [posts, setPosts] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isError,   setIsError  ] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_APIURL}/api/content/?page=${page}&limit=${limit}`, { method: 'GET' })
            .then(res => res.json())
            .then(p => { setPosts(p.Posts); setIsLoading(false) })
            .catch((e) => setIsError(e));
    }, [])


    if ( isLoading ) return <h1 className="flex justify-center items-center">Loading ...</h1>
    if ( isError ) return alert(isError);
    
    return (
        <Loyout>
            <div className="bg-slate-100 pt-20 flex flex-col items-center w-screen p-2">
                <div className="flex flex-col gap-2 lg:w-[40%] ">
                    <UploadButton/>
                    {posts.map((post) => {
                        return <CardPost key={ post.post_id } post={ post } /> 
                    })}     
                </div>
                 
            </div>
        </Loyout>
    )

}