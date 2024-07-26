class Storage {
	#titles;

	constructor() {
		this.#titles = localStorage.getItem("titles");
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
