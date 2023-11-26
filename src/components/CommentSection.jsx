import { useState } from "react";
import { Comment } from "./Comment";

export const CommentSection = ({ comments, post_id }) => {
	const [commentText, setCommentText] = useState({ comment: "" });

	const HandleComment = (e) => {
		e.preventDefault()
		console.log(commentText)
		fetch(`${process.env.REACT_APP_APIURL}/api/comment/${post_id}`, {
			method: 'POST',
            credentials: 'include',
            headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(commentText)
		})
			.then(res => res.json())
			.then(d => window.location.reload());
	}
	return (
		<div className="w-full bg-white rounded-lg border border-gray-300 p-4">
			<div className="flex flex-col mb-8">
				
				<textarea
					rows="4" 
					className="resize-none font-normal text-md outline-none border border-gray-300 rounded-lg p-2 focus:bg-gray-50 focus:border-gray-800" 
					placeholder="Add a Comment..."
					onChange={e => setCommentText({
						...commentText,
						comment: e.target.value
					})}/>
				{
					commentText.comment.length >= 1 && 
						<div className="mt-4">
							<button className="bg-gray-800 text-white text-md font-semibold rounded-lg p-2 px-4"
								onClick={e => HandleComment(e)}>
								Comment
							</button>
						</div>
					
				}
			</div>
			{
				comments.map((comment) => {
					return <Comment key={comment.comment_id} comment={comment}/>
				})
			}
		</div>
	)
}