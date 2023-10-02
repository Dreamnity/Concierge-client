import ConciergeClient from "./index.ts";
const client = new ConciergeClient("test");
client.on("open", () => {
	console.log("connected");
	client.send("test", "hi");
});
client.on("message", console.log);
client.on("error", console.error);
client.on("close", () => console.log("closed"));
