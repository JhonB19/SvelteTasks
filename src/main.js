import App from './App.svelte';
import './firebase';
import 'bootswatch/dist/lux/bootstrap.min.css';
import "toastify-js/src/toastify.css"

const app = new App({
	target: document.body,
	props: {

	}
});

export default app;