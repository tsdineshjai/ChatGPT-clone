import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import "./ChatList.css";

const ChatList = () => {
	const { isPending, error, data } = useQuery({
		queryKey: ["userChats"],
		queryFn: () =>
			fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
				credentials: "include",
			}).then((res) => res.json()),
	});
	return (
		<section className="chatList">
			<span
				className="title"
				style={{
					textAlign: "center",
					fontSize: "13px",
					marginRight: "auto",
					paddingLeft: "15px",
				}}
			>
				DASHBOARD
			</span>
			<Link to="/dashboard">Create a new Chat</Link>
			<Link to="/">Explore TSRI AI</Link>
			<Link to="/">Contact</Link>
			<hr />
			<section className="chats">
				{isPending
					? "Loading..."
					: error
					? "Something went wrong!"
					: data?.map((chat) => (
							<Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
								{chat.title}
							</Link>
					  ))}
			</section>
			<hr />
			<section className="proSection">
				<img src="logo.png" alt="logo" />
				<div>
					<p>Upgrade to TSRI AI Pro</p>
					<p>Get unlimited access to all features</p>
				</div>
			</section>
		</section>
	);
};

export default ChatList;
