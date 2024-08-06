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
		aiData: {},
	});
	const [aiResponse, setAiResponse] = React.useState("");
	const [question, setQuestion] = React.useState("");

	const endRef = React.useRef(null);
	React.useEffect(() => {
		endRef.current.scrollIntoView({ behaviour: "smooth" });
	}, [aiResponse, img.dBdata, question]);

	const chat = model.startChat({
		history: [
			{
				role: "user",
				parts: [{ text: "Hello, I have 2 dogs in my house." }],
			},
			{
				role: "model",
				parts: [{ text: "Great to meet you. What would you like to know?" }],
			},
		],
		generationConfig: {
			// maxOutputTokens: 100,
		},
	});

	const add = async (text) => {
		setQuestion(text);
		const result = await chat.sendMessageStream(
			Object.entries(img.aiData).length ? [img.aiData, text] : [text]
		);

		let accumulatedText = "";
		for await (const chunk of result.stream) {
			const chunkText = chunk.text();
			accumulatedText += chunkText;
			setAiResponse(accumulatedText);
		}
		setImg({
			isLoading: false,
			error: "",
			dBdata: {},
			aiData: {},
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const text = e.target.text.value;
		if (!text) return;
		add(text);
	};

	return (
		<div className="newPrompt">
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

			{!!question && <div className="question"> {question} </div>}

			<div className="response" style={{ margin: "20px 5px" }}>
				{!!aiResponse && <Markdown>{aiResponse}</Markdown>}
			</div>

			<div className="endOfChat" ref={endRef}></div>
			<form className="newForm" onSubmit={handleSubmit}>
				<Upload setImg={setImg} />
				<input type="file" id="file" multiple={false} hidden />

				<input
					type="text"
					className="search"
					placeholder="Ask me anything... "
					name="text"
				/>
				<button>
					<img src="/arrow.png" alt="" />
				</button>
			</form>
		</div>
	);
}

export default NewPrompt;
