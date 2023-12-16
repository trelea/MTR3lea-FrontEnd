
export const Pagination = ({ serachParams, setSearchParams }) => {
    return (
        <div className="flex flex-col justify-center items-center mb-4">
            <div className="flex gap-1">
                <select id="underline_select" class="block py-2 px-3 text-lg font-medium text-gray-800 bg-transparent text-center hover:bg-gray-200 rounded-2xl border border-gray-400">
                    <option selected>Limit {serachParams.get("limit")}</option>
                    <option value="20" onClick={() => setSearchParams({
                        page: serachParams.get("page"),
                        limit: "20"
                    })}>20 posts</option>
                    <option value="50" onClick={() => setSearchParams({
                        page: serachParams.get("page"),
                        limit: "50"
                    })}>50 posts</option>
                    <option value="100" onClick={() => setSearchParams({
                        page: serachParams.get("page"),
                        limit: "100"
                    })}>100 posts</option>
                </select>
            </div>
            
            <nav className="flex mt-4 items-center">
                <button disabled={ Number(serachParams.get("page")) === 1 ? true : false }
                onClick={() => setSearchParams({
                    limit: serachParams.get("limit"),
                    page: Number(serachParams.get("page")) - 1
                })}>
                    <img className="rotate-180" width="40" height="40" src="https://img.icons8.com/ios-filled/50/circled-chevron-right.png" alt="circled-chevron-right"/>
                </button>
                <h1 className="text-2xl border rounded-full aspect-square px-2.5 border-gray-800 mx-4 ">{serachParams.get("page")}</h1>
                <button onClick={() => setSearchParams({
                    limit: serachParams.get("limit"),
                    page: Number(serachParams.get("page")) + 1
                })}>
                    <img width="40" height="40" src="https://img.icons8.com/ios-filled/50/circled-chevron-right.png" alt="circled-chevron-right"/>
                </button>
            </nav>
        </div>
        
    )
}