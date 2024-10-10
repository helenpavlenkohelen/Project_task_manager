class Card {
	#title;
	#description;
	#parentElement;
	#layout;
	#titleLayout;
	#descriptionLayout;
	#addActiveCard;
	#btnsCard;
	#updateCards;

	constructor(
		title,
		description,
		parentElement,
		addActiveCard,
		btnsCard,
		updateCards
	) {
		this.#updateCards = updateCards;
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
	get parentElement() {
		return this.#parentElement;
	}
	get title() {
		return this.#title;
	}

	get description() {
		return this.#description;
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
				this.#layout.style.width = getComputedStyle(
					this.#parentElement
				).width;
				document.onmousemove = (e) => {
					this.#layout.style.left =
						e.pageX - this.#layout.offsetWidth / 2 + "px";
					this.#layout.style.top =
						e.pageY - this.#layout.offsetHeight / 2 + "px";
				};
				this.#layout.onmouseup = (e) => {
					document.onmousemove = null;
					this.#layout.hidden = true;
					const endBlock = document.elementFromPoint(
						e.pageX,
						e.pageY
					);
					this.#layout.hidden = false;
					this.#layout.style.zIndex = 0;
					this.#layout.style.position = "static";
					if (endBlock.classList.contains("tasks-blocks__cards")) {
						endBlock.append(this.#layout);
						// console.log(this.#parentElement);
					}

					/*
            Цель: У блока который мы переносили, заменить его
            parentElement на блок в который мы его поместили
          
            PLAN
            1 - Найти и вывести в консоль блок в котором теперь находится наша карточка +
            2 - Заменить parentElementу карточки на блок
            this.#parentElement = endBlock.parentElement
          */

					this.#updateCards(
						this.#parentElement.firstElementChild.textContent,
						endBlock.parentElement.firstElementChild.textContent,
						this.#title
					);

					this.#parentElement = endBlock.parentElement;
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
			this.#addActiveCard(this.#layout);
		};
	}
}

export default Card;
