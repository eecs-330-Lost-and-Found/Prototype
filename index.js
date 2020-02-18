const moneyInput = document.querySelector("#money-input");
const moneyError = document.querySelector("#money-error");
moneyInput.oninput = e => {
	const currVal = e.target.value;
	const isPrice = /^[0-9]+(\.[0-9][0-9]?)?$/.test(currVal);
	if (!isPrice) {
		moneyError.style.display = "block";
	}
	else{
		moneyError.style.display = "none";
	}

};
