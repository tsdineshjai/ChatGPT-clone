import { Link, Outlet } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import {
	SignedIn,
	SignedOut,
	SignInButton,
	UserButton,
} from "@clerk/clerk-react";
import "./RootLayout.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key");
}

const RootLayout = () => {
	return (
		<ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
			<section className="rootLayout">
				<header>
					<Link to="/" className="link">
						<img src="/ariplay.svg" className="logo" />
						<span>TSRI AI </span>
					</Link>
					<div className="user">
						<SignedOut>
							<SignInButton />
						</SignedOut>
						<SignedIn>
							<UserButton />
						</SignedIn>

						<i data-feather="circle"></i>
					</div>
				</header>
				<main>
					<Outlet />
				</main>
			</section>
		</ClerkProvider>
	);
};

export default RootLayout;
