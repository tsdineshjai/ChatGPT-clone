import express from "express";
import cors from "cors";

import ImageKit from "imagekit";

const PORT = process.env.PORT || 3000;

const imagekit = new ImageKit({
	urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
	publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
	privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

const app = express();

app.use(express.json());

app.use(
	cors({
		origin: process.env.CLIENT_URL,
	})
);

// // allow cross-origin requests
// app.use(function (req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header(
// 		"Access-Control-Allow-Headers",
// 		"Origin, X-Requested-With, Content-Type, Accept"
// 	);
// 	next();
// });

app.get("/api/upload", function (req, res) {
	var result = imagekit.getAuthenticationParameters();
	res.send(result);
});

app.get("/", (req, res) => {
	res.send("it works and works");
});

app.listen(PORT, () => console.log("server listening to the port 3000"));
