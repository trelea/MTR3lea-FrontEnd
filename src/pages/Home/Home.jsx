import { useState, useEffect, } from "react";
import { Loyout } from "../../components/Loyout";
import { CardPost } from "../../components/CardPost";
import { UploadButton } from "../../components/UploadButton.jsx";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "../../components/Pagination.jsx";
import { Modal } from "../../components/Modal.jsx"


export const Home = () => {
    const [serachParams, setSearchParams] = useSearchParams({ page: 1, limit: 20 });
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError,   setIsError  ] = useState(false);
    const [isAuthenticated, setAuthenticated] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_APIURL}/api/content/?page=${serachParams.get('page')}&limit=${serachParams.get('limit')}`, { method: 'GET' })
            .then(res => res.json())
            .then(p => {
                if (p.msg) return alert(p.msg);
                setPosts(p.Posts); 
                setIsLoading(false) 
            })
            .catch((e) => setIsError(e));
    }, [serachParams])


    if ( isLoading ) return <h1 className="flex justify-center items-center">Loading ...</h1>
    if ( isError ) return alert(isError);
    
    return (
        <Loyout>
            {
                !isAuthenticated && <Modal/>
            }
            <div className="bg-slate-100 pt-20 flex flex-col items-center w-screen p-2">
                <div className="flex flex-col gap-2 w-full sm:w-[95%] md:w-[80%] lg:w-[65%] xl:w-[50%] 2xl:w-[40%]">
                    <UploadButton/>
                    <div className="flex flex-col gap-2">
                        {posts.map((post) => {
                            return <CardPost key={post.post_id} post={post} postOptions={false} setAuthenticated={setAuthenticated} /> 
                        })}
                    </div>
                    <Pagination serachParams={serachParams} setSearchParams={setSearchParams}/>  
                </div>         
            </div>
        </Loyout>
    )

}