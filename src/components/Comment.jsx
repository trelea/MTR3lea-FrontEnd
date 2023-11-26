export const Comment = ({ comment }) => {
	return (
		<>
			<div className="flex gap-2 items-center">
                <img className="rounded-full object-cover h-6 w-6" src={`${process.env.REACT_APP_APIURL}${comment.user_thumbnail}`} alt="" />
                <h1 className="font-semibold text-sm text-gray-700 hover:underline hover:text-blue-700">/{comment.user_name}</h1>
                <h1 className="font-semibold text-xs text-gray-600">Commented at: {new Date(comment.post_created_at).toLocaleString()}</h1>
            </div>
            <div className="mt-1 border-b mb-6 border-gray-300">
            	<h1 className="whitespace-pre-line align-bottom font-medium text-md text-gray-800 break-words mb-6">{comment.comment_text}</h1>
            </div>
		</>
	)
}