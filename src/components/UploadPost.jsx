import { useState } from "react";

export const UploadPost = ({ setUploadPost, userMenu, setUserMenu }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [thumbnail, setThumbnail] = useState(null);
	const [postRes, setPostRes] = useState(null);	

	const [dropBtn, setDropBtn] = useState(true);

	const checkExtension = (fileName) => {
		if (fileName.split('.').pop() === 'jpg') return true;
		if (fileName.split('.').pop() === 'jpeg') return true;
		if (fileName.split('.').pop() === 'png') return true;
		if (fileName.split('.').pop() === 'webp') return true;
		return false;
	}

	const HandleNewPost = (e) => {
		e.preventDefault();
		setDropBtn(!dropBtn);
		const formData = new FormData();
		formData.append('title', title);
		formData.append('description', description);
		thumbnail && formData.append('thumbnail', thumbnail);

		fetch(`${process.env.REACT_APP_APIURL}/api/content`, { 
			method: 'POST', 
			body: formData, 
			credentials: 'include'
			
		})
			.then(res => res.json())
			.then(post => {
				if (post.msg === "New Post Created.") {
					setPostRes("New Post Created. Wait 2 sec to redirect.");
					setUploadPost(false);
					window.location.href = `/post/${post.post_id}`;
				}
				setPostRes(post)
			})

	}

	return (
		<div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-80 md:px-24 lg:px-48 xl:px-96 z-50">
			<div className="bg-white p-4 rounded-2xl w-full mx-4">

				<div className="flex justify-end">
					<button className="border border-gray-800 rounded-full hover:bg-gray-200 p-1" onClick={() => {
						setUploadPost(false);
						if (userMenu) return setUserMenu(false);
						return;
					}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
				</div>

				<div className="flex justify-center items-center py-8">
					<h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 border-gray-800">New Announcement.</h1>
				</div>

				<form className="flex flex-col gap-4" onSubmit={e => HandleNewPost(e)}>

					<div className="flex flex-col gap-1">
						<label className="text-sm font-medium">Thumbnail</label>
						<div className="border border-dashed border-gray-800 rounded-lg p-4">
							
							<div className="text-center">
								{
									thumbnail ?
										<>
											<div className="p-2 text-xl font-medium">
												<h1>{thumbnail.name}</h1>
											</div> 
											<h3 className="mt-2 text-sm font-medium text-gray-800">
	            								<label className="relative cursor-pointer">
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
	                										if (e.target.files && checkExtension(e.target.files[0].name)) return setThumbnail(e.target.files[0]);		
	                										return setThumbnail(null);
	                									}}/>
	            								</label>
        									</h3>
        									<p className="mt-1 text-xs text-gray-600">Only PNG, JPG, WEBP up to ~10MB.</p>
        								</>
										:
										<>
											<img className="mx-auto h-12 w-12" src="https://www.svgrepo.com/show/357902/image-upload.svg" alt=""/>
        									<h3 className="mt-2 text-sm font-medium text-gray-800">
            									<label className="relative cursor-pointer">
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
                											if (e.target.files && checkExtension(e.target.files[0].name)) return setThumbnail(e.target.files[0]);		
                											return setThumbnail(null);
                										}}/>
            									</label>
        									</h3>
        									<p className="mt-1 text-xs text-gray-600">Only PNG, JPG, WEBP up to ~10MB.</p>
        									<p className="mt-4 text-xs text-gray-600">If your image name is not displayed,</p>
        									<p className="text-xs text-gray-600">Then your file is not supported.</p>
										</>
								}
        						
    						</div>

						</div>
						
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-sm font-medium">Title</label>
						<textarea
							rows="2" 
							className="resize-none font-medium text-sm outline-none border border-gray-300 rounded-lg p-2 focus:bg-gray-50 focus:border-gray-800" 
							placeholder="Write the title of post..."
							onChange={(e) => setTitle(e.target.value)}/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-sm font-medium">Description</label>
						<textarea 
							rows="10" 
							className="resize-none font-medium text-sm outline-none border border-gray-300 rounded-lg p-2 focus:bg-gray-50 focus:border-gray-800" 
							placeholder="Write the description of post..."
							onChange={(e) => setDescription(e.target.value)}/>
					</div>

					{
						postRes && 
							<div className="p-2">
								<h1 className="text-sm text-blue-800">{JSON.stringify(postRes)}</h1>
							</div>
					}

					<div className="flex justify-end">
						<button className="bg-gray-800 text-white font-medium rounded-lg p-1 px-4">Drop</button>
					</div>
				</form>
				
			</div>
		</div>
	)
}