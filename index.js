const rewardInput = document.querySelector("#reward-input");
const rewardError = document.querySelector("#reward-error");
rewardInput.oninput = e => {
  const currVal = e.target.value;
  const isPrice = /^[0-9]+(\.[0-9][0-9]?)?$/.test(currVal);
  if (!isPrice && currVal !== "") {
    rewardError.style.display = "flex";
  } else {
    rewardError.style.display = "none";
  }
};

const dateInput = document.querySelector("#date-input");
const dateError = document.querySelector("#date-error");
dateInput.oninput = e => {
  const currVal = e.target.value;
  const isDate = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/.test(
    currVal
  );
  if (!isDate && currVal !== "") {
    dateError.style.display = "flex";
  } else {
    dateError.style.display = "none";
  }
};
