import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import NewPrompt from "../../Components/newPrompt/NewPrompt";

import "./chatPage.css";
import { IKImage } from "imagekitio-react";
import Markdown from "react-markdown";

const ChatPage = () => {
	const path = useLocation().pathname;
	const chatId = path.split("/").pop();

	console.log(chatId);

	const { isPending, error, data } = useQuery({
		queryKey: ["chat", chatId],
		queryFn: () =>
			fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
				credentials: "include",
			}).then((res) => res.json()),
	});

	console.log(Array.isArray(data));

	return (
		<section className="chatPage">
			<div className="wrapper">
				<div className="chat">
					{isPending
						? "Loading..."
						: error
						? "Something went wrong!"
						: data[0].history.map((message, i) => (
								<>
									{message.img && (
										<IKImage
											urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
											path={message.img}
											height="300"
											width="400"
											transformation={[{ height: 300, width: 400 }]}
											loading="lazy"
											lqip={{ active: true, quality: 20 }}
										/>
									)}
									<div
										className={
											message.role === "user" ? "message user" : "message"
										}
										key={i}
									>
										<Markdown>{message.parts[0].text}</Markdown>
									</div>
								</>
						  ))}

					<div className="prompt">
						<NewPrompt />
					</div>
				</div>
			</div>
		</section>
	);
};

export default ChatPage;
