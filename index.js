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

const uploader = document.querySelector("#file-upload");
uploader.onchange = e => {
  const imgViewer = document.querySelector(".image-viewer");
  imgViewer.style.backgroundImage = `url(${URL.createObjectURL(
    e.target.files[0]
  )})`;
};

const submitButton = document.querySelector("#submit");
submitButton.onclick = e => {
  const textFields = document.querySelectorAll(".form-input");
  const radioChecked = document.querySelector("input[name='radius']:checked");
  const textFilledOut = Array.from(textFields).every(
    field => field.value || field.value === 0
  );
  const inputValidation =
    rewardError.style.display === "none" && dateError.style.display === "none";
  if (textFilledOut && radioChecked && inputValidation) {
    alert("You have successfully filed a lost item!");
  } else if (!textFilledOut || !radioChecked) {
    alert("Please fill out all required fields.");
  } else {
    e.preventDefault();
    alert("Please check the format of the reward and date lost.");
  }
};
