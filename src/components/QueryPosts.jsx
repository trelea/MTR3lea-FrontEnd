import { Link } from "react-router-dom";

export const QueryPosts = ({ details }) => {
	return (
		<div className="px-4 py-2 hover:bg-gray-200">
			<Link 
				to={`/post/${details.post_id}`} 
				onClick={() => window.location.href=`/post/${details.post_id}`}
				className="flex">

				<div className="flex justify-center items-center">
					<div className="h-10 w-10">
						<img src={`${process.env.REACT_APP_APIURL}${details.post_thumbnail}`} className="h-10 w-10 aspect-square rounded-full"/>
					</div>
				</div>

				<div className="ml-4">		
					<h1 className="text-lg font-medium hover:underline">{details.post_title}</h1>
					<p className="text-md font-normal hover:text-blue-600 hover:underline"><strong>By: </strong>{details.user_name}</p>
				</div>
			</Link>
		</div>
	)
}