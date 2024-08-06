
import "./dashboardPage.css";

const DashboardPage = () => {
	async function handleSubmit(e) {
		e.preventDefault();
		const text = e.target.text.value;
		if (!text) {
			return;
		}
		//either one of the below type of requests are fine.

		//withCredentials: true, we are gonna send userId information via cookies via clerk.

		// axios
		// 	.post(
		// 		"http://localhost:3000/api/chats",
		// 		{
		// 			text,
		// 		},
		// 		{
		// 			withCredentials: true,
		// 		}
		// 	)
		// 	.then((res) => console.log(res))
		// 	.catch((err) => console.log(err))
		// 	.finally(() => console.log(`post request was made`));

		await fetch("http://localhost:3000/api/chats", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ text }),
		});
	}
	return (
		<div className="dashboardPage">
			<div className="texts">
				<div className="logo">
					<img src="/logo.png" />
					<h1>TSRI AI</h1>
				</div>
				<div className="options">
					<div className="option">
						<img src="/chat.png" />
						<span>Create a New Chat</span>
					</div>
					<div className="option">
						<img src="/image.png" />
						<span>Analyze Images</span>
					</div>
					<div className="option">
						<img src="/code.png" />
						<span>Help me with my Code</span>
					</div>
				</div>
			</div>
			<div className="formContainer">
				<form onSubmit={handleSubmit}>
					<input type="text" name="text" placeholder="Ask me anything..." />
					<button>
						<img src="/arrow.png" />
					</button>
				</form>
			</div>
		</div>
	);
};

export default DashboardPage;
