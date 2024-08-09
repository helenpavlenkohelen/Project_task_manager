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

	constructor(actionAddCard) {
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
		console.log(this.#activeCard, card);
		this.#activeCard.value = card;
		console.log(this.#activeCard, card);
	}

	addActiveCard(card) {
		console.log(this);
		this.activeCard = card;
	}

	#controllerBtnCreateCart() {
		this.#btnCreate.onclick = () => {
			const card = new Card(
				this.#inputData.value,
				this.#textAreaData.value,
				this.#activeBlock,
				this.addActiveCard,
				this.#btnsCard
			);

			this.#actionAddCard(card);

			// const divCard = document.createElement("div");
			// const divTitle = document.createElement("div");
			// const divDescription = document.createElement("div");

			// divCard.classList.add("tasks-blocks__card");
			// divTitle.classList.add("tasks-blocks__card_title");
			// divDescription.classList.add("tasks-blocks__card_description");

			// divTitle.textContent = this.#inputData.value;
			// divDescription.textContent = this.#textAreaData.value;
			// divCard.append(divTitle);
			// divCard.append(divDescription);
			// divDescription.hidden = true;

			// const cardData = {
			// 	title: divTitle.textContent,
			// 	description: divDescription.textContent,
			// };

			// const cardData = [];
			// cardData.push(divTitle.textContent);
			// cardData.push(divDescription.textContent);

			// localStorage.setItem("divCard", JSON.stringify(cardData));

			// console.log(this.#activeBlock.lastElementChild);
			// this.#activeBlock.lastElementChild.append(divCard);

			this.#inputData.value = "";
			this.#textAreaData.value = "";

			this.#modalCreateCard.classList.remove("active");

			// divTitle.ondblclick = () => {
			// 	if (divDescription.hidden) {
			// 		divDescription.hidden = false;
			// 	} else {
			// 		divDescription.hidden = true;
			// 	}
			// };

			// divCard.oncontextmenu = (e) => {
			// 	e.preventDefault();
			// 	e.stopPropagation();

			// 	this.#btnsCard.hidden = false;
			// 	this.#btnsCard.style.top = e.clientY + "px";
			// 	this.#btnsCard.style.left = e.clientX + "px";
			// 	this.#activeCard = divCard;
			// };

			// divCard.onmousedown = () => {
			// 	divCard.style.zIndex = 10;
			// 	divCard.style.position = "fixed";
			// 	document.onmousemove = (e) => {
			// 		console.log("e.pageX:", e.pageX, "e.pageY", e.pageY);
			// 		divCard.style.left =
			// 			e.pageX -
			// 			parseFloat(getComputedStyle(divCard).width) / 2 +
			// 			"px";
			// 		divCard.style.top =
			// 			e.pageY -
			// 			parseFloat(getComputedStyle(divCard).height) / 2 +
			// 			"px";
			// 	};
			// };
		};

		//     #conrtollerMoveCard(){

		// }
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
