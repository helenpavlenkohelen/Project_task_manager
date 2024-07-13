import { TaskManager } from "./TaskManager.js";

document.addEventListener("DOMContentLoaded", () => {
	new TaskManager();
	const titles = localStorage.getItem("titles");
	const blocks = document.querySelectorAll(".tasks-blocks__block");
	if (!titles) {
		let titles = [...blocks].map(
			(block) => block.firstElementChild.textContent
		);
		console.log(titles);
		localStorage.setItem("titles", JSON.stringify(titles));
		console.log(titles);
	} else {
		const savedTitles = JSON.parse(titles);
		for (let i = 0; i < blocks.length; i++) {
			blocks[i].firstElementChild.textContent = savedTitles[i];
		}
	}
});

class Save {
	#save(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	#load(key) {
		const data = localStorage.getItem(key);
		return data ? JSON.parse(data) : null;
	}

	#remove(key) {
		localStorage.removeItem(key);
	}

	#clearAll() {
		localStorage.clear();
	}

	saveDate(key, value) {
		this.#save(key, value);
	}

	loadDate(key) {
		return this.#load(key);
	}

	removeDate(key) {
		this.#remove(key);
	}

	clearStorage() {
		this.#clearAll();
	}
}

const save = new Save();
const key = "history";
const value = "saved-date";

save.saveDate(key, value);
console.log(save.loadDate(key));
save.removeDate(key);
save.clearStorage();