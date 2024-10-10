import Card from "./card.js";

class Menu {
	#activeBlock;
	#activeCard;
	#menuBlock;
	#modalCreateCard;
	#btnAddCart;
	#form;
	#inputData;
	#textAreaData;
	#btnCreate;
	#btnsCard;
	#btnOpenCard;
	#btnDeleteCard;
	#btnSortCart;
	#actionAddCard;
	#updateCards;

	constructor(actionAddCard, updateCards) {
		this.#updateCards = updateCards;
		this.#actionAddCard = actionAddCard;
		this.#menuBlock = document.querySelector(".menu");
		this.#modalCreateCard = document.querySelector(".modal");
		this.#btnAddCart = document.querySelector(".menu__button:first-child");
		this.#form = document.querySelector(".modal__enter");
		this.#inputData = document.querySelector(".modal__name");
		this.#textAreaData = document.querySelector(".modal__discription");
		this.#btnCreate = document.querySelector(".modal__button_create");
		this.#btnsCard = document.querySelector(".btns-card");
		this.#btnOpenCard = document.querySelector(".btn-card:first-child");
		this.#btnDeleteCard = document.querySelector(".btn-card:last-child");
		this.#btnSortCart = document.querySelector(".menu__button:last-child");
		this.#activeCard = { value: null };
		this.addActiveCard = this.addActiveCard.bind(this);
	}

	#controllerOpenMenu(blocks) {
		for (const block of blocks) {
			block.oncontextmenu = (e) => {
				e.preventDefault();
				this.#activeBlock = block;
				this.#menuBlock.hidden = false;
				this.#menuBlock.style.top = e.clientY + "px";
				this.#menuBlock.style.left = e.clientX + "px";
			};
		}
	}

	#controllerAddCartButton() {
		this.#btnAddCart.onclick = () => {
			this.#modalCreateCard.classList.add("active");
			this.#menuBlock.hidden = true;
		};
	}

	#controllerCloseMenu() {
		document.onclick = () => {
			if (!this.#menuBlock.hidden) {
				this.#menuBlock.hidden = true;
			}
			if (!this.#btnsCard.hidden) {
				this.#btnsCard.hidden = true;
			}
		};
	}

	#conrtollerModalAddClose() {
		this.#form.onclick = (e) => {
			e.stopPropagation();
		};
		this.#modalCreateCard.onclick = () => {
			this.#modalCreateCard.classList.remove("active");
		};
	}

	set activeCard(card) {
		this.#activeCard.value = card;
	}

	addActiveCard(card) {
		this.activeCard = card;
	}

	#controllerBtnCreateCart() {
		this.#btnCreate.onclick = () => {
			const card = new Card(
				this.#inputData.value,
				this.#textAreaData.value,
				this.#activeBlock,
				this.addActiveCard,
				this.#btnsCard,
				this.#updateCards
			);

			this.#actionAddCard(card);

			this.#inputData.value = "";
			this.#textAreaData.value = "";

			this.#modalCreateCard.classList.remove("active");
		};
	}

	#controllerMenuActionCard = () => {
		this.#btnOpenCard.onclick = () => {
			if (this.#activeCard.value.lastElementChild.hidden) {
				this.#activeCard.value.lastElementChild.hidden = false;
				this.#btnOpenCard.textContent = "закрыть";
			} else {
				this.#activeCard.value.lastElementChild.hidden = true;
				this.#btnOpenCard.textContent = "открыть";
			}

			this.#btnsCard.hidden = true;
		};

		this.#btnDeleteCard.onclick = () => {
			this.#activeCard.value.remove();
			this.#btnsCard.hidden = true;
		};
	};

	#controllerSortCarts() {
		this.#btnSortCart.onclick = () => {
			this.#menuBlock.hidden = true;
			const cardsHtmlCollection =
				this.#activeBlock.lastElementChild.children;
			const cardsArray = Array.from(cardsHtmlCollection);

			cardsArray.sort((card1, card2) => {
				const res = card1.firstElementChild.textContent.localeCompare(
					card2.firstElementChild.textContent
				);
				return res;
			});

			this.#activeBlock.lastElementChild.innerHTML = "";
			for (const card of cardsArray) {
				this.#activeBlock.lastElementChild.append(card);
			}
		};
	}

	start(blocks) {
		this.#controllerOpenMenu(blocks);
		this.#controllerAddCartButton();
		this.#controllerCloseMenu();
		this.#conrtollerModalAddClose();
		this.#controllerBtnCreateCart();
		this.#controllerSortCarts();
		this.#controllerMenuActionCard();
		// this.#controllerCloseBtnsCard();
	}
}

export { Menu };
