class Card {
	#title;
	#description;
	#parentElement;
	#layout;
	#titleLayout;
	#descriptionLayout;
	#addActiveCard;
	#btnsCard;

	constructor(title, description, parentElement, addActiveCard, btnsCard) {
		this.#title = title;
		this.#description = description;
		this.#parentElement = parentElement;
		this.#addActiveCard = addActiveCard;
		this.#btnsCard = btnsCard;

		this.#createLayout();
		this.#controllerOpenCloseDesc();
		this.#controllerMoveCard();
		this.#controllerCardMenu();
	}

	#createLayout() {
		const divCard = document.createElement("div");
		const divTitle = document.createElement("div");
		const divDescription = document.createElement("div");

		divCard.classList.add("tasks-blocks__card");
		divTitle.classList.add("tasks-blocks__card_title");
		divDescription.classList.add("tasks-blocks__card_description");

		divTitle.textContent = this.#title;
		divDescription.textContent = this.#description;

		divCard.append(divTitle);
		divCard.append(divDescription);
		divDescription.hidden = true;

		console.log(this.#parentElement);
		this.#parentElement.lastElementChild.append(divCard);
		this.#layout = divCard;
		this.#titleLayout = divTitle;
		this.#descriptionLayout = divDescription;
	}

	#controllerOpenCloseDesc() {
		this.#titleLayout.ondblclick = () => {
			if (this.#descriptionLayout.hidden) {
				this.#descriptionLayout.hidden = false;
			} else {
				this.#descriptionLayout.hidden = true;
			}
		};
	}

	#controllerMoveCard() {
		this.#layout.onmousedown = (e) => {
			if (e.which == 1) {
				this.#layout.style.zIndex = 10;
				this.#layout.style.position = "fixed";
				document.onmousemove = (e) => {
					console.log("e.pageX:", e.pageX, "e.pageY", e.pageY);
					this.#layout.style.left =
						e.pageX -
						parseFloat(getComputedStyle(this.#layout).width) / 2 +
						"px";
					this.#layout.style.top =
						e.pageY -
						parseFloat(getComputedStyle(this.#layout).height) / 2 +
						"px";
				};
			}
		};
	}

	#controllerCardMenu() {
		this.#layout.oncontextmenu = (e) => {
			e.preventDefault();
			e.stopPropagation();
			if (this.#layout.lastElementChild.hidden) {
				this.#btnsCard.firstElementChild.textContent = "открыть";
			} else {
				this.#btnsCard.firstElementChild.textContent = "закрыть";
			}
			this.#btnsCard.hidden = false;
			this.#btnsCard.style.top = e.clientY + "px";
			this.#btnsCard.style.left = e.clientX + "px";
			console.log(this.#addActiveCard);
			this.#addActiveCard(this.#layout);
		};
	}
}

export default Card;
