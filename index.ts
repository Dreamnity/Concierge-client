import EventEmitter from "events";

class ConciergeClient extends EventEmitter {
	constructor(name: string, server: string="https://cc.hop.sh") {
		super();
		this.socket = new WebSocket(server);
		this.socket.onopen = () => {
			this.socket.onmessage = (message: MessageEvent) => {
				let data = JSON.parse(message.data);
				if (data.error) return this.emit("error", new Error(data.error));
				this.emit("message", data);
			};
			this.socket.onerror = e => this.emit("error", e);
			this.socket.onclose = () => {
				this.emit("close");
				this.socket.close();
			};
			this.#send({ newName: name });
			this.emit("open");
		};
	}
	name: string;
	socket: WebSocket;
	#send(message) {
		let data = JSON.stringify(message);
		this.socket.send(data);
	}
	send(target: string, message: any) {
		this.#send({ target, message });
	}
}
export default ConciergeClient;