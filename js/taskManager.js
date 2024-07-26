import { Storage } from "./storage.js";
import { Menu } from "./menu.js";

class TaskManager {
	#blocks;
	#storage;
	#menu;

	constructor() {
		this.#blocks = document.querySelectorAll(".tasks-blocks__block");
		this.#storage = new Storage();
		this.#menu = new Menu();
	}

	#controllerChangeTitle() {
		for (const block of this.#blocks) {
			const title = block.firstElementChild;
			title.ondblclick = () => {
				const input = document.createElement("input");
				input.value = title.textContent;
				block.append(input);
				title.hidden = true;

				input.onkeydown = (e) => {
					if (e.key == "Enter") {
						title.textContent = input.value;

						const titles = [];
						for (const block of this.#blocks) {
							const title = block.firstElementChild.textContent;
							titles.push(title);
						}

						localStorage.setItem("titles", JSON.stringify(titles));

						title.hidden = false;
						input.remove();
					}
				};
			};
		}
	}

	start() {
		if (this.#storage.checkTitles()) {
			this.#storage.loadTitles(this.#blocks);
		} else {
			this.#storage.saveTitles(this.#blocks);
		}
		this.#controllerChangeTitle();
		this.#menu.start(this.#blocks);
	}
}

export { TaskManager };
