import Card from "./card.js";

class Storage {
	#titles;
	#cards;
	#actionMenu;

	constructor() {
		this.#cards = JSON.parse(localStorage.getItem("cards"));
		this.#titles = JSON.parse(localStorage.getItem("titles"));

		if (!this.#titles) this.#titles = [];

		if (!this.#cards) {
			this.#initCards();
		}
	}

	set actionMenu(addActiveCard) {
		this.#actionMenu = addActiveCard;
	}

	updateCards(titleFrom, titleTo, titleCard) {
		console.log(titleFrom, titleTo, titleCard);
		const cardsFromArray = this.#cards[titleFrom];

		// for (let i = 0; i < cardsFromArray.length; i++) {
		// 	let card = cardsFromArray[i];
		// 	if (card.title == titleCard) {
		// 		console.log(card);
		// 		cardsFromArray.splice(i, 1); // .splice(idx,count)
		// 		break;
		// 	}
		// }

		// let idx = 0;
		// for (const card of cardsFromArray) {
		// 	if (card.title == titleCard) {
		// 		console.log(card);
		// 		cardsFromArray.splice(idx, 1); // .splice(idx,count)
		// 		break;
		// 	}
		// 	idx++;
		// }

		// cardsFromArray.forEach((card, idx) => {
		// 	if (card.title == titleCard) {
		// 		cardsFromArray.splice(idx, 1);
		// 	}
		// });

		for (const card of cardsFromArray) {
			console.log(card.title, "==", titleCard);
			if (card.title == titleCard) {
				console.log("if");
				this.#cards[titleTo].push(card);
				const idx = cardsFromArray.indexOf(card);
				cardsFromArray.splice(idx, 1); // .splice(idx,count)
				break;
			}
		}
		console.log(this.#cards);
		localStorage.setItem("cards", JSON.stringify(this.#cards));

		/*
        0 - Найти массив с лобъектами и вывести в консоль 
        1 - Заппустить цикл перебирающий блоки
        2 - Сравнивать тайтлы перебираемых блоков с тайтлом блока котоорый переносили
        2 - Найти блок который мы будем удалять и вывести в консол
    */

		// console.log(titleFrom);
		// console.log(titleTo);
		// console.log(titleCard);
		// console.log(this);
	}

	addCard(card) {
		const cardItem = {
			title: card.title,
			description: card.description,
		};

		const title = card.parentElement.firstElementChild.textContent;
		this.#cards[title].push(cardItem);

		localStorage.setItem("cards", JSON.stringify(this.#cards));
	}

	chengeTitleCards(prevTitle, newTitle) {
		const arrayCards = this.#cards[prevTitle];
		delete this.#cards[prevTitle];
		this.#cards[newTitle] = arrayCards;
		localStorage.setItem("cards", JSON.stringify(this.#cards));
	}

	checkTitles() {
		return this.#titles.length != 0 ? true : false;
	}

	checkCards(blocks) {
		for (const block of blocks) {
			const title = block.firstElementChild.textContent;
			const cardsArray = this.#cards[title];
			for (const cardObject of cardsArray) {
				new Card(
					cardObject.title,
					cardObject.description,
					block,
					this.#actionMenu,
					document.querySelector(".btns-card"),
					this.updateCards.bind(this)
				);
			}
		}
	}

	loadTitles(blocks) {
		for (let i = 0; i < blocks.length; i++) {
			blocks[i].firstElementChild.textContent = this.#titles[i];
		}
	}

	#initCards() {
		this.#cards = {};
		for (const title of this.#titles) {
			this.#cards[title] = [];
		}
	}

	saveTitles(blocks) {
		// Array.from(blocks).map
		let titles = [...blocks].map(
			(block) => block.firstElementChild.textContent
		);

		this.#titles = titles;
		localStorage.setItem("titles", JSON.stringify(titles));
		this.#initCards();
	}
}

export { Storage };
