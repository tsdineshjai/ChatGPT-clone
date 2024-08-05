import "./NewPrompt.css";

import React from "react";
function NewPrompt() {
	const endRef = React.useRef(null);

	React.useEffect(() => {
		endRef.current.scrollIntoView({ behaviour: "smooth" });
	}, []);
	return (
		<div className="newPrompt">
			{/* end of the chat */}
			<div className="endOfChat" ref={endRef}></div>
			<form className="newForm">
				<label htmlFor="file">
					<img src="/attachment.png" alt="" />
				</label>
				<input type="file" id="file" multiple={false} hidden />

				<input
					type="text"
					className="search"
					placeholder="Ask me anything... "
				/>

				<button>
					<img src="/arrow.png" alt="" />
				</button>
			</form>
		</div>
	);
}

export default NewPrompt;
