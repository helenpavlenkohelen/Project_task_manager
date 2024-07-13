import { Test } from "./test.js";

class TaskManager {
	#blocks;

	constructor() {
		this.#blocks = document.querySelectorAll(".tasks-blocks__block");
		this.#controllerChangeTitle();
		new Test();
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
}

export { TaskManager };



class Save {
  

}