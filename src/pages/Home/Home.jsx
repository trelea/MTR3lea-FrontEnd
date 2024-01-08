import { Loyout } from "../../components/Loyout";
import { CardPost } from "../../components/CardPost";
import { UploadButton } from "../../components/UploadButton.jsx";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "../../components/Pagination.jsx";
import { Page404 } from "../404.jsx";
import { useQuery } from "react-query";


export const Home = () => {
    const [serachParams, setSearchParams] = useSearchParams({ page: 1, limit: 20 });

    const { data, isLoading, isError } = useQuery({
        queryKey: ['fetchHomePosts'],
        queryFn: () => fetch(`${process.env.REACT_APP_APIURL}/api/content/?page=${serachParams.get('page')}&limit=${serachParams.get('limit')}`, { method: 'GET' }).then(res => res.json())
    }) 

    if ( data?.msg === "You are too far" ) return <Page404 />
    if ( isLoading ) return <h1 className="flex justify-center items-center">Loading ...</h1>
    if ( isError ) return alert(isError);
    
    return (
        <Loyout>
            <div className="bg-slate-100 pt-20 flex flex-col items-center w-screen p-2">
                <div className="flex flex-col gap-2 w-full sm:w-[95%] md:w-[80%] lg:w-[65%] xl:w-[50%] 2xl:w-[40%]">
                    <UploadButton/>
                    <div className="flex flex-col gap-2">
                        {data.Posts.map((post) => {
                            return <CardPost key={post.post_id} post={post} postOptions={false} /> 
                        })}
                    </div>
                    <Pagination serachParams={serachParams} setSearchParams={setSearchParams}/>  
                </div>         
            </div>
        </Loyout>       
    )
}