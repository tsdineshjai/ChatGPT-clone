import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
	ChatPage,
	DashbaordLayout,
	DashboardPage,
	Homepage,
	RootLayout,
	SignInPage,
	SignUpPage,
} from "./routes";

const router = createBrowserRouter([
	{
		element: <RootLayout />, //this comp content stays throught the app route. it contains navbar content
		//rootlayout's childrent is avaiable as Outlet component in the component defintion.
		children: [
			{ path: "/", element: <Homepage /> },
			{ path: "/sign-in", element: <SignInPage /> },
			{ path: "/sign-up", element: <SignUpPage /> },

			{
				element: <DashbaordLayout />, //this content appears throughout the dashboard route.
				children: [
					{ path: "/dashboard", element: <DashboardPage /> },
					{
						path: "dashboard/chats/:id",
						element: <ChatPage />,
					},
				],
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<RouterProvider router={router} />
);
