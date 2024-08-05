import React from "react";
import { TypeAnimation } from "react-type-animation";

import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
	const [typingStatus, setTypingStatus] = React.useState("human1");
	return (
		<section className="homepage">
			<section className="left">
				<img
					src="orbital.png"
					alt="background-image"
					className="backgrounOfLeft"
				/>
				<h1>TSRI AI</h1>
				<h3>SuperCharge your creativity and productivity</h3>

				<h5>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia
					cumque nulla odio quod repudiandae eligendi.
				</h5>

				<button>
					<Link to="/dashboard">Get Started</Link>
				</button>
			</section>
			<section className="right">
				<img src="bg.png" alt="background" className="bg" />
				<img src="bot.png" alt="robbie" className="robot" />

				<div className="typeAnimation">
					<img
						src={
							typingStatus == "human2"
								? "human2.jpeg"
								: typingStatus == "human1"
								? "human1.jpeg"
								: "bot.png"
						}
					/>
					<TypeAnimation
						sequence={[
							"Human: We produce food for Mice",
							2000,
							() => {
								setTypingStatus("bot");
							},

							"Bot: We produce food for Hamsters",
							2000,
							() => {
								setTypingStatus("human2");
							},
							"Human: We produce food for Guinea Pigs",
							2000,
							() => {
								setTypingStatus("bot");
							},
							"Bot: We produce food for Chinchillas",
							2000,
							() => {
								setTypingStatus("human1");
							},
						]}
						wrapper="span"
						repeat={Infinity}
						cursor={true}
						omitDeletionAnimation={true}
					/>
				</div>
			</section>

			<div className="terms">
				<img src="/logo.png" alt="" />
				<div className="links">
					<Link to="/" className="link">
						Terms of Service
					</Link>
					<span>|</span>
					<Link to="/">Privacy Policy</Link>
				</div>
			</div>
		</section>
	);
};

export default HomePage;
