<script lang="ts">
	import { onMount } from 'svelte';
	import type { Socket } from 'socket.io-client';
	import io from 'socket.io-client';

	let message: string = '';
	let messages: string[] = [];

	let socket: Socket;

	onMount(() => {
		socket = io('http://localhost:3000'); // Ensure this matches your server URL

		socket.on('connect', () => {
			console.log('Connected to server');
		});

		socket.on('message', (msg: string) => {
			messages = [...messages, msg];
		});
	});

	function sendMessage(): void {
		if (message.trim().length > 0) {
			socket.emit('message', message);
			message = '';
		}
	}
</script>

<main>
	<h1>Chat</h1>
	<input
		bind:value={message}
		on:keyup={(event) => {
			if (event.key === 'Enter') sendMessage();
		}}
	/>
	<button on:click={sendMessage}>Send</button>

	<ul>
		{#each messages as msg}
			<li>{msg}</li>
		{/each}
	</ul>
</main>

<style>
	/* Add any desired styles here */
</style>
