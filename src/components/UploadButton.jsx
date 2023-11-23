import { useContext, useState } from "react";
import { UserContext } from "./Loyout";
import { UploadPost } from "./UploadPost";

export const UploadButton = () => {
	const { data } = useContext(UserContext);
	const [uploadPost, setUploadPost] = useState(false);

	if (uploadPost) return <UploadPost uploadPost={uploadPost} setUploadPost={setUploadPost}/>

	return (
		<>
			{
				data.user_name && 
					<div className="w-full bg-white rounded-lg border border-gray-300 p-4 hover:border-gray-400 text-gray-600 hover:bg-gray-200 hover:text-black"
						onClick={() => setUploadPost(!uploadPost)}>
						<div className="flex flex-row gap-2 justify-center items-center">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
		  						<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<h1 className="text-lg font-semibold">New Announcement</h1>
						</div>
					</div>
			}
		</>
	)

}