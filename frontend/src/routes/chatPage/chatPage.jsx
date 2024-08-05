import NewPrompt from "../../Components/newPrompt/NewPrompt";
import "./chatPage.css";

const ChatPage = () => {
	return (
		<section className="chatPage">
			<div className="wrapper">
				<div className="chat">
					<div className="message">Test message from AI</div>
					<div className="message user">Test message from User</div>
					<div className="message">Test message from AI</div>
					<div className="message user">Test message from User</div>
					<div className="message">Test message from AI</div>
					<div className="message user">
						I am very good at moving things and completing task in time
					</div>
					<div className="message">Test message from AI</div>
					<div className="message user">Test message from User</div>
					<div className="message">Test message from AI</div>
					<div className="message user">Test message from User</div>
					<div className="message">Test message from AI</div>
					<div className="message user">Test message from User</div>
					<div className="message">Test message from AI</div>
					<div className="message user">Test message from User</div>
					<div className="message">Test message from AI</div>
					<div className="message user">Test message from User</div>
					<div className="message">Test message from AI</div>
					<div className="message user">Test message from User</div>
					<div className="message">Test message from AI</div>
					<div className="message user">Test message from User</div>
					<div className="message">Test message from AI</div>
					<div className="message user">Test message from User</div>
					<NewPrompt />
				</div>
			</div>
		</section>
	);
};

export default ChatPage;
