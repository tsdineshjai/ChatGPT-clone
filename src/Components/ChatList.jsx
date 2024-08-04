import { Link } from "react-router-dom";

import "./ChatList.css";

const ChatList = () => {
	return (
		<section className="chatList">
			<Link>Create a new Chat</Link>
			<Link>Explore TSRI AI</Link>
			<Link>Contact</Link>

			<hr />
			<sectionn className="chats">
				<p>My Chat Title</p>
				<p>My Chat Title</p>
				<p>My Chat Title</p>
				<p>My Chat Title</p>
				<p>My Chat Title</p>
			</sectionn>

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
