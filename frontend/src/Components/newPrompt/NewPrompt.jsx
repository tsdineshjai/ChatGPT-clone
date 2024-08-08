/* eslint-disable react/prop-types */
import React from "react";
import { IKImage } from "imagekitio-react";

import Upload from "../Upload/Upload";
import Markdown from "react-markdown";
import model from "../../../lib/gemini";

import "./NewPrompt.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function NewPrompt({ data }) {
	const [img, setImg] = React.useState({
		isLoading: false,
		error: "",
		dBdata: {},
		aiData: {},
	});
	const [aiResponse, setAiResponse] = React.useState("");
	const [question, setQuestion] = React.useState("");

	const endRef = React.useRef(null);
	const formRef = React.useRef(null);
	React.useEffect(() => {
		endRef.current.scrollIntoView({ behaviour: "smooth" });
	}, [data, aiResponse, img.dBdata, question]);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: () => {
			return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data[0]._id}`, {
				method: "PUT",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					question: question.length ? question : undefined,
					answer: aiResponse,
					img: img.dbData?.filePath || undefined,
				}),
			}).then((res) => res.json());
		},
		onSuccess: () => {
			// Invalidate and refetch
			queryClient
				.invalidateQueries({ queryKey: ["chat", data[0]._id] })
				.then(() => {
					setQuestion("");
					setAiResponse("");
					formRef.current.reset();
					setImg({
						isLoading: false,
						error: "",
						dBdata: {},
						aiData: {},
					});
				});
		},
		onError: (err) => {
			console.log(err);
		},
	});

	const chat = model.startChat({
		history: [
			data[0]?.history.map(({ role, parts }) => ({
				role,
				parts: [{ text: parts[0].text }],
			})),
		],
		generationConfig: {
			// maxOutputTokens: 100,
		},
	});
	const addCallback = React.useCallback(
		async (text, isInitial) => {
			if (!isInitial) {
				setQuestion(text);
			}
			try {
				const result = await chat.sendMessageStream(
					Object.entries(img.aiData).length ? [img.aiData, text] : [text]
				);

				let accumulatedText = "";
				for await (const chunk of result.stream) {
					const chunkText = chunk.text();
					accumulatedText += chunkText;
					setAiResponse(accumulatedText);
				}
				mutation.mutate();
			} catch (e) {
				console.log(e);
			}
		},
		[chat, img.aiData, mutation]
	);

	const add = async (text, isInitial) => {
		if (!isInitial) {
			setQuestion(text);
		}
		try {
			const result = await chat.sendMessageStream(
				Object.entries(img.aiData).length ? [img.aiData, text] : [text]
			);

			let accumulatedText = "";
			for await (const chunk of result.stream) {
				const chunkText = chunk.text();
				accumulatedText += chunkText;
				setAiResponse(accumulatedText);
			}
			mutation.mutate();
		} catch (e) {
			console.log(e);
		}
	};

	// IN PRODUCTION WE DON'T NEED IT

	const hasRun = React.useRef(false);

	React.useEffect(() => {
		if (!hasRun.current) {
			if (data[0]?.history?.length === 1) {
				addCallback(data[0].history[0].parts[0].text, true);
			}
		}
		hasRun.current = true;
	}, [addCallback]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const text = e.target.text.value;
		if (!text) return;
		add(text, false);
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
			<form className="newForm" onSubmit={handleSubmit} ref={formRef}>
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
