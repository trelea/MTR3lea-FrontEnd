
export const Pagination = ({ serachParams, setSearchParams }) => {
    return (
        <div className="flex flex-col justify-center items-center mb-2">
            <div className="flex gap-1 p-6">
                <label className="font-medium text-lg underline">Preview Limit</label>
                <select name="posts" id="posts">
                    <option 
                        onClick={() => {
                            setSearchParams({
                                page: serachParams.get("page"),
                                limit: 20
                            })
                        }}>20</option>

                    <option
                        onClick={() => {
                            setSearchParams({
                                page: serachParams.get("page"),
                                limit: 50
                            })
                        }}>50</option>

                    <option
                        onClick={() => {
                            setSearchParams({
                                page: serachParams.get("page"),
                                limit: 100
                            })
                        }}>100</option>
                    
                </select>
            </div>
            
            <nav className="flex">
                <button className={Number(serachParams.get("page")) === 1 ?
                    "bg-gray-600 text-white rounded-xl font-normal text-sm p-2 px-6":
                    "bg-gray-800 text-white rounded-xl font-normal text-sm p-2 px-6 hover:bg-gray-600"
                }
                disabled={ Number(serachParams.get("page")) === 1 ? true : false }
                onClick={() => {
                    setSearchParams({
                        limit: serachParams.get("limit"),
                        page: Number(serachParams.get("page")) - 1
                    })
                }}>Back</button>

                <h1 className="font-medium text-lg p-2 mx-2 underline">Page: {serachParams.get("page")}</h1>

                <button className="bg-gray-800 text-white rounded-xl font-normal text-sm p-2 px-6 hover:bg-gray-600"
                onClick={() => {
                    setSearchParams({
                        limit: serachParams.get("limit"),
                        page: Number(serachParams.get("page")) + 1
                    })
                }}>Next</button>
            </nav>
        </div>
        
    )
}