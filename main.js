import { TaskManager } from "./js/taskManager.js";

document.addEventListener("DOMContentLoaded", () => {
	const taskManager = new TaskManager();
	taskManager.start();
});
