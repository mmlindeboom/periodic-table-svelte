import App from './App.svelte';

const app = new App({
	target: document.querySelector('.pt-container'),
	hydrate: true
});

export default app;