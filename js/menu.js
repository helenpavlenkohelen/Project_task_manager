class Menu {
	#activeBlock;
	#menu;
	#modalWindow;
	#btnAddCart;
	#form;
	#inputData;
	#textAreaData;
	#btnCreate;
	#btnsCard;
	#btnOpenCard;
	#btnCloseCard;
	#btnSortCart;

	constructor() {
		this.#menu = document.querySelector(".menu");
		this.#modalWindow = document.querySelector(".modal");
		this.#btnAddCart = document.querySelector(".menu__button:first-child");
		this.#form = document.querySelector(".modal__enter");
		this.#inputData = document.querySelector(".modal__name");
		this.#textAreaData = document.querySelector(".modal__discription");
		this.#btnCreate = document.querySelector(".modal__button_create");
		this.#btnsCard = document.querySelector(".btns-Card");
		this.#btnOpenCard = document.querySelector(".btn-Card:first-child");
		this.#btnCloseCard = document.querySelector(".btn-Card:last-child");
		this.#btnSortCart = document.querySelector(".menu__button:last-child");
	}

	#controllerOpenMenu(blocks) {
		for (const block of blocks) {
			block.oncontextmenu = (e) => {
				e.preventDefault();
				this.#activeBlock = block;
				this.#menu.hidden = false;
				this.#menu.style.top = e.clientY + "px";
				this.#menu.style.left = e.clientX + "px";
			};
		}
	}

	#controllerAddCart() {
		this.#btnAddCart.onclick = () => {
			this.#modalWindow.classList.add("active");
			this.#menu.hidden = true;
		};
	}

	#controllerCloseMenu() {
		document.onclick = () => {
			if (!this.#menu.hidden) {
				this.#menu.hidden = true;
			}
		};
	}

	#conrtollerModalAddClose() {
		this.#form.onclick = (e) => {
			e.stopPropagation();
		};
		this.#modalWindow.onclick = () => {
			this.#modalWindow.classList.remove("active");
		};
	}

	#controllerBtnCreateCart() {
		this.#btnCreate.onclick = () => {
			const divCard = document.createElement("div");
			const divTitle = document.createElement("div");
			const divDescription = document.createElement("div");

			divCard.classList.add("tasks-blocks__card");
			divTitle.classList.add("tasks-blocks__card_title");
			divDescription.classList.add("tasks-blocks__card_description");

			divCard.append(divTitle);
			divCard.append(divDescription);
			divTitle.textContent = this.#inputData.value;
			divDescription.textContent = this.#textAreaData.value;
			divDescription.hidden = true;

			console.log(this.#activeBlock.lastElementChild);
			this.#activeBlock.lastElementChild.append(divCard);
			this.#inputData.value = "";
			this.#textAreaData.value = "";

			this.#modalWindow.classList.remove("active");

			divTitle.ondblclick = () => {
				if (divDescription.hidden) {
					divDescription.hidden = false;
				} else {
					divDescription.hidden = true;
				}
			};

			divTitle.oncontextmenu = (e) => {
				e.preventDefault();
				this.#btnsCard.hidden = false;
				this.#btnsCard.style.top = e.clientY + "px";
				this.#btnsCard.style.left = e.clientX + "px";
				console.log(e);
			};

			this.#btnOpenCard.onclick = () => {
				divDescription.hidden = false;
			};

			this.#btnCloseCard.onclick = () => {
				divDescription.hidden = true;
			};
		};
	}

	#controllerSortCarts() {
		this.#btnSortCart.onclick = () => {
			this.#menu.hidden = true;
		};
	}

	start(blocks) {
		this.#controllerOpenMenu(blocks);
		this.#controllerAddCart();
		this.#controllerCloseMenu();
		this.#conrtollerModalAddClose();
		this.#controllerBtnCreateCart();
		this.#controllerSortCarts();
	}
}

export { Menu };
