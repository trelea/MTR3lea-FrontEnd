import { Link, useNavigate } from "react-router-dom"


export const Pagination = ({ serachParams }) => {
    return (
        <div className="flex flex-col justify-center items-center mb-4">

            <div className="flex gap-1">
                <details className="p-1 px-4 text-lg font-medium text-gray-800 bg-white text-center rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-gray-100">   
                    <summary>Limit {serachParams.get("limit")}</summary>
                    <div className="flex flex-col border-t mt-1 border-gray-300">
                        <Link
                            className="mt-1 hover:bg-gray-200 rounded-lg px-2"
                            to={`/?page=${serachParams.get("page")}&limit=20`}
                            preventScrollReset
                            reloadDocument>20 posts</Link>
                        <Link 
                            className="mt-1 hover:bg-gray-200 rounded-lg px-2"
                            to={`/?page=${serachParams.get("page")}&limit=50`} 
                            preventScrollReset
                            reloadDocument>50 posts</Link>
                        <Link 
                            className="mt-1 hover:bg-gray-200 rounded-lg px-2"
                            to={`/?page=${serachParams.get("page")}&limit=100`} 
                            preventScrollReset
                            reloadDocument>100 posts</Link>
                    </div>
                </details>
            </div>
            
            <div className="flex mt-4 items-center">

                <div className="flex flex-row shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-gray-100 text-lg font-medium text-gray-800 bg-white rounded-xl">
                    <button className="py-1 px-4 flex items-center justify-center hover:bg-gray-800 hover:text-white hover:rounded-l-xl">
                        <Link
                            to={ Number(serachParams.get("page")) === 1 ? '#' : `/?page=${Number(serachParams.get("page")) - 1}&limit=${serachParams.get("limit")}`}
                            preventScrollReset
                            reloadDocument>Prev</Link>
                    </button>
                    <h1 className="flex items-center justify-center px-4 border-r border-l">{serachParams.get("page")}</h1>
                    <button className="py-1 px-4 flex items-center justify-center hover:bg-gray-800 hover:text-white hover:rounded-r-xl">
                        <Link
                            to={`/?page=${Number(serachParams.get("page")) + 1}&limit=${serachParams.get("limit")}`}
                            preventScrollReset
                            reloadDocument>Next</Link>
                    </button>
                </div>
            </div>
        </div>
        
    )
}