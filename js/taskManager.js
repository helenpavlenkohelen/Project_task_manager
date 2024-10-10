import { Storage } from "./storage.js";
import { Menu } from "./menu.js";

class TaskManager {
	#blocks;
	#storage;
	#menu;

	constructor() {
		this.#blocks = document.querySelectorAll(".tasks-blocks__block");
		this.#storage = new Storage();
		this.#menu = new Menu(
			this.#storage.addCard.bind(this.#storage),
			this.#storage.updateCards.bind(this.#storage)
		);
		this.#storage.actionMenu = this.#menu.addActiveCard;
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
						const prevTitle = title.textContent;
						title.textContent = input.value;

						const titles = [];
						for (const block of this.#blocks) {
							const title = block.firstElementChild.textContent;
							titles.push(title);
						}

						localStorage.setItem("titles", JSON.stringify(titles));
						this.#storage.chengeTitleCards(
							prevTitle,
							title.textContent
						); //v1
						/*
              План
              1 - обращение к title карточек
              2 - Сохранить массив данных по ключу в отдельную переменную
              3 - удалить старый title 
              4 - добавить новый title
              5 - добавить массив данных по новому ключу
            */

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
		this.#storage.checkCards(this.#blocks);
	}
}

export { TaskManager };
