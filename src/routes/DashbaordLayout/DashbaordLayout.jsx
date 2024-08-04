import { Link, Outlet, useNavigate } from "react-router-dom";
import "./DashbaordLayout.css";
import { useAuth } from "@clerk/clerk-react";
import React from "react";
import ChatList from "../../Components/ChatList";

const DashbaordLayout = () => {
	const { userId, isLoaded } = useAuth();

	const navigate = useNavigate();

	React.useEffect(() => {
		if (isLoaded && !userId) {
			navigate("/sign-in");
		}
	}, [isLoaded, navigate, userId]);

	if (!isLoaded) {
		return <h3>Loading...</h3>;
	}

	return (
		<section className="dashBoard">
			<section className="menu">
				<ChatList />
			</section>
			<main className="content">
				<Outlet />
			</main>
		</section>
	);
};

export default DashbaordLayout;
