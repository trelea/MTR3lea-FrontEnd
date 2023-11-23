export const ShareBtn = (props) => {
	return (
		<div className="fixed bottom-0 left-0 flex justify-center items-center p-2 w-screen">
			<div className="text-md text-green-800 border border-green-300 rounded-lg bg-green-100 w-[400px] break-words p-1 bg-opacity-80">
				<h1>Copied To Clipboard.</h1>
				<h1><strong>{props.link}</strong></h1>
			</div>
		</div>
	)
}