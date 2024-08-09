class Storage {
	#titles;
	#cards;

	constructor() {
		this.#cards = localStorage.getItem("cards");
		this.#titles = localStorage.getItem("titles");
	}

	get cards() {
		return this.#cards;
	}

	set cards(card) {
		if (this.cards) {
			this.#cards.push(card);
		} else {
			this.#cards = [card];
		}
	}

	addCard(card) {
		this.cards = card;

		// Добавлять карточку в локальное хранилие
		// const cardData = [];
		// cardData.push(divTitle.textContent);
		// cardData.push(divDescription.textContent);

		// localStorage.setItem("divCard", JSON.stringify(cardData));
	}

	checkTitles() {
		return this.#titles ? true : false;
	}

	loadTitles(blocks) {
		const savedTitles = JSON.parse(this.#titles);
		for (let i = 0; i < blocks.length; i++) {
			blocks[i].firstElementChild.textContent = savedTitles[i];
		}
	}

	saveTitles(blocks) {
		let titles = [...blocks].map(
			(block) => block.firstElementChild.textContent
		);
		localStorage.setItem("titles", JSON.stringify(titles));
	}
}

export { Storage };
