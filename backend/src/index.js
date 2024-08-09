import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

import ImageKit from "imagekit";
import Chat from "../models/chats.js";
import UserChats from "../models/userChats.js";

const PORT = process.env.PORT || 3000;

const imagekit = new ImageKit({
	urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
	publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
	privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

const connect = () => {
	try {
		mongoose
			.connect(process.env.MONGO_DB)
			.then(() => console.log("Connected! to the mongoDB"));
	} catch (err) {
		console.log(err);
	}
};

const app = express();

app.use(express.json());

// app.use(
// 	cors({
// 		origin: "*",
// 		credentials: true,
// 	})
// );

const corsOptions = {
	origin: "chat-gpt-clone-brown-five.vercel.app",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
	credentials: true, // Allow cookies or other credentials
	optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(401).send("Unauthenticated!");
});
app.get("/api/upload", function (req, res) {
	var result = imagekit.getAuthenticationParameters();
	res.send(result);
});

app.get("/", (req, res) => {
	res.send("it works and works");
});

app.post("/api/chats", ClerkExpressRequireAuth(), async (req, res) => {
	const userId = req.auth.userId;
	const { text } = req.body;

	try {
		// CREATE A NEW CHAT
		const newChat = new Chat({
			userId: userId,
			history: [{ role: "user", parts: [{ text }] }],
		});

		const savedChat = await newChat.save();
		console.log(`chat is created successfully`);

		// CHECK IF THE USERCHATS EXISTS,SO THAT WE CAN UPDATE THE NEW CHAT
		const userChats = await UserChats.find({ userId: userId });

		// IF DOESN'T EXIST CREATE A NEW ONE AND ADD THE CHAT IN THE CHATS ARRAY
		if (!userChats.length) {
			const newUserChats = new UserChats({
				userId: userId,
				chats: [
					{
						_id: savedChat._id,
						title: text.substring(0, 40),
					},
				],
			});

			await newUserChats.save();

			console.log(`newUSerChats is created successfully`, newUserChats._id);
		} else {
			// IF EXISTS, PUSH THE CHAT TO THE EXISTING ARRAY
			console.log(`i came to push the chat.`);
			await UserChats.updateOne(
				{ userId: userId },
				{
					$push: {
						chats: {
							_id: savedChat._id,
							title: text.substring(0, 40),
						},
					},
				}
			);

			res.status(201).send(newChat._id);
			console.log(`newUSerChats is updated successfully`);
		}
	} catch (err) {
		console.log(`error has occured in saving the chat to the chats history`);
		res.status(500).send(`Error creating Chat!`);
	}
});

app.get("/api/userchats", ClerkExpressRequireAuth(), async (req, res) => {
	const userId = req.auth.userId;
	try {
		const fetchedChats = await UserChats.find({ userId });
		res.status(200).send(fetchedChats[0].chats);
	} catch (err) {
		console.log(err);
		res.status(500).send("Error occurred in fetching chats");
	}
});

//finding a partiuclar chat
app.get("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
	const userId = req.auth.userId;

	const chatId = req.params.id;
	try {
		//it fetches all the chats from the userID
		const fetchedChats = await Chat.find({ _id: chatId, userId });
		res.status(200).send(fetchedChats);
	} catch (err) {
		console.log(err);
		res.status(500).send("Error occurred in fetching chats");
	}
});

//updating a partiuclar chat
app.put("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
	const userId = req.auth.userId;

	const { question, answer, img } = req.body;

	const newItems = [
		...(question
			? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]
			: []),
		{ role: "model", parts: [{ text: answer }] },
	];

	try {
		const updatedChat = await Chat.updateOne(
			{ _id: req.params.id, userId },
			{
				$push: {
					history: {
						$each: newItems,
					},
				},
			}
		);
		console.log(updatedChat);
		res.status(200).send(updatedChat);
	} catch (err) {
		console.log(err);
		res.status(500).send("Error occurred in adding conversations");
	}
});

app.listen(PORT, () => {
	connect();
	console.log("server listening to the port 3000");
});
