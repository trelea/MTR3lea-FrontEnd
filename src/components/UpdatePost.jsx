import { useEffect, useRef, useState } from "react"

const checkExtension = (fileName) => {
	if (fileName.split('.').pop() === 'jpg') return true;
	if (fileName.split('.').pop() === 'jpeg') return true;
	if (fileName.split('.').pop() === 'png') return true;
	if (fileName.split('.').pop() === 'webp') return true;
	return false;
}

export const UpdatePost = ({ post_id, editPost, setEditPost, setPreviewPostOptions }) => {
    const refTitle = useRef();
    const refDescription = useRef();
	const [newThumb, setNewThumb] = useState(null);

    const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [thumbnail, setThumbnail] = useState(null);

	const [oldData, setOldData] = useState({});

    useEffect(() => {
        fetch(`${process.env.REACT_APP_APIURL}/api/content/${post_id}`, { method: 'GET', credentials: 'include'})
            .then(res => res.json())
            .then(data => {
                refTitle.current.value = data.post.post_title;
                refDescription.current.value = data.post.post_description;
				setTitle(data.post.post_title);
				setDescription(data.post.post_description);
				setThumbnail(data.post.post_thumbnail)
				return setOldData({ title: data.post.post_title, description: data.post.post_description, thumbnail: data.post.post_thumbnail });
			})
    }, [post_id])

	const HandleUpdatePost = (e) => {
		e.preventDefault()
		const formData = new FormData();
		formData.append('title', title);
		formData.append('description', description);
		if (newThumb !== null) formData.append('thumbnail', newThumb);
		
		fetch(`${process.env.REACT_APP_APIURL}/api/content/${post_id}`, { 
			method: 'PUT', 
			body: formData, 
			credentials: 'include'
		})
			.then(res => res.json())
			.then(data => {
				if (data.msg === "Post Updated") return window.location.href = `/post/${data.post.post_id}`;
			})
	}

    return (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-80 md:px-24 lg:px-48 xl:px-96 z-50">
			<div className="bg-white p-4 rounded-2xl w-full mx-4">
				<div className="flex justify-end">
					<button className="border border-gray-800 rounded-full hover:bg-gray-200 p-1" 
						onClick={() => {
							setPreviewPostOptions(false); 
							return setEditPost(!editPost)
						}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
				</div>

				<div className="flex justify-center items-center py-8">
					<h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 border-gray-800">Edit Announcement.</h1>
				</div>

				<form className="flex flex-col gap-4">

					<div className="flex flex-col gap-1">
						<label className="text-sm font-medium">Thumbnail</label>
						<div className="border border-dashed border-gray-800 rounded-lg p-4">
							
							<div className="text-center">
								<h3 className="mt-2 text-sm font-medium text-gray-800">
	            					<label className="relative cursor-pointer">
										<div className="flex justify-center items-center">
											{
												newThumb ?
													<img className="h-24 sm:h-34 lg:h-44 text-center" src={URL.createObjectURL(newThumb)} alt="" /> :
													<img className="h-24 sm:h-34 lg:h-44 text-center" src={thumbnail} alt="" />
											}	
										</div>
	                					<span>Drag and drop</span>
	                					<span className="text-indigo-600"> or browse </span>
	                					<span>to upload</span>
	            						<input 
	            							accept="images/*"
	            							type="file" 
	                						name="file" 
	                						id="file" 
	                						className="hidden"
	                						onChange={e => {
	                							if (e.target.files && checkExtension(e.target.files[0].name)) {
													setNewThumb(e.target.files[0]);
													return setThumbnail(null);
												}	
	                							return setNewThumb(null);
	            							}}/>
	            					</label>
        						</h3>
        						<p className="mt-1 text-xs text-gray-600">Only PNG, JPG, WEBP up to ~10MB.</p>
							</div>
                            
						</div>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-sm font-medium">Title</label>
						<textarea
                            ref={refTitle}
							rows="2" 
							className="resize-none font-medium text-sm outline-none border border-gray-300 rounded-lg p-2 focus:bg-gray-50 focus:border-gray-800" 
							placeholder="Write the title of post..."
                            onChange={e => setTitle(e.target.value)}
                            />
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-sm font-medium">Description</label>
						<textarea 
                            ref={refDescription}
							rows="10" 
							className="resize-none font-medium text-sm outline-none border border-gray-300 rounded-lg p-2 focus:bg-gray-50 focus:border-gray-800" 
							placeholder="Write the description of post..."
                            onChange={e => {
								setDescription(e.target.value);
								
							}}
                            />
					</div>


    				<div className="flex justify-end">
						{
							(title.length !== 0 && description.length !== 0) && (title !== oldData.title || description !== oldData.description || newThumb) && 
								<button className="bg-gray-800 text-white font-medium rounded-lg p-1 px-4" onClick={e => HandleUpdatePost(e)}>Update</button>
						}
						
					</div>
				</form>
				
			</div>
		</div>
    )
}