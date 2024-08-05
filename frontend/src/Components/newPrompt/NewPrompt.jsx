import { IKImage } from "imagekitio-react";
import Upload from "../Upload/Upload";
import Markdown from "react-markdown";
import "./NewPrompt.css";

import React from "react";
import model from "../../../lib/gemini";
function NewPrompt() {
	const [img, setImg] = React.useState({
		isLoading: false,
		error: "",
		dBdata: {},
	});
	const [prompt, setPrompt] = React.useState("");
	const [aiResponse, setAiResponse] = React.useState("");
	const [loading, setLoading] = React.useState(false);

	const endRef = React.useRef(null);
	React.useEffect(() => {
		endRef.current.scrollIntoView({ behaviour: "smooth" });
	}, [aiResponse, img.dBdata]);

	const run = async () => {
		const result = await model.generateContent(prompt);
		const response = await result.response;
		setAiResponse(response.text());
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!prompt) return;
		setLoading(true);
		await run();
		setPrompt("");
		setLoading(false);
	};

	return (
		<div className="newPrompt">
			{/* end of the chat */}

			{img.isLoading && <div>Loading...</div>}

			{/* fetching the uploaded image from the image kit database */}
			{img.dBdata?.filePath && (
				<IKImage
					path={img.dBdata.filePath}
					urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
					width="380"
					transformation={[{ width: 380 }]}
				/>
			)}

			<div className="endOfChat" ref={endRef}></div>

			{!!prompt && <div className="question"> {prompt} </div>}

			<div className="response" style={{ margin: "20px 5px" }}>
				{loading ? (
					<h1>Loading... </h1>
				) : (
					!!aiResponse && <Markdown>{aiResponse}</Markdown>
				)}
			</div>

			<form className="newForm" onSubmit={handleSubmit}>
				<Upload setImg={setImg} />
				<input type="file" id="file" multiple={false} hidden />

				<input
					type="text"
					className="search"
					placeholder="Ask me anything... "
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
				/>
				<button>
					<img src="/arrow.png" alt="" />
				</button>
			</form>
		</div>
	);
}

export default NewPrompt;
