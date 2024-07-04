const title = document.querySelector(".tasks-blocks__title");
const block = document.querySelector(".tasks-blocks__block");
title.ondblclick = () => {
	const input = document.createElement("input");
	input.value = title.textContent;
	block.append(input);
	title.hidden = true;

	input.onkeydown = (e) => {
		if (e.key == "Enter") {
			title.textContent = input.value;
			title.hidden = false;
			input.remove();
		}
	};
};

// Перевести на ООП код
