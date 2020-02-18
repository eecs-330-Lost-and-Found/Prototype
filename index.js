const rewardInput = document.querySelector("#reward-input");
const rewardError = document.querySelector("#reward-error");
rewardInput.oninput = e => {
  const currVal = e.target.value;
  const isPrice = /^[0-9]+(\.[0-9][0-9]?)?$/.test(currVal);
  if (!isPrice && currVal !== "") {
    rewardError.style.display = "block";
  } else {
    rewardError.style.display = "none";
  }
};
