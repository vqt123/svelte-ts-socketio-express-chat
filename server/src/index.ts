import express from 'express';
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import cors from 'cors';

const app = express();

// CORS configuration for the Svelte client
const corsOptions = {
	origin: 'http://localhost:5173', // Adjust as per your Svelte client URL
	methods: ['GET', 'POST']
};

app.use(cors(corsOptions));

const server = http.createServer(app);
const io = new SocketIOServer(server, { cors: corsOptions });

io.on('connection', (socket) => {
	console.log('a user connected');

	// Listen for messages sent by clients
	socket.on('message', (msg) => {
		console.log('Message received:', msg);

		// Broadcast the message to all other clients
		socket.broadcast.emit('message', msg);
	});

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

server.listen(3000, () => {
	console.log('listening on *:3000');
});
