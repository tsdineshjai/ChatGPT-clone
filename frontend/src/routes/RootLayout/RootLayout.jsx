import { Link, Outlet } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { SignedIn, UserButton } from "@clerk/clerk-react";

import {
	useQuery,
	useMutation,
	useQueryClient,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import "./RootLayout.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key");
}

const queryClient = new QueryClient();

const RootLayout = () => {
	return (
		<ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
			<QueryClientProvider client={queryClient}>
				<section className="rootLayout">
					<header>
						<Link to="/" className="link">
							<img src="/logo.png" className="logo" />
							<span>TSRI AI </span>
						</Link>
						<div className="user">
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
			</QueryClientProvider>
		</ClerkProvider>
	);
};

export default RootLayout;
