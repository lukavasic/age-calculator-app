const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const dayOut = document.getElementById("outputDays");
const monthOut = document.getElementById("outputMonths");
const yearOut = document.getElementById("outputYears");
const calculateBtn = document.getElementById("calculateBtn");

calculateBtn.addEventListener("click", () => {
  const DD = Number(dayInput.value);
  const MM = Number(monthInput.value);
  const YYYY = Number(yearInput.value);

  const dateTemplate = `${YYYY},${MM},${DD}`;

  if (!validateInput(YYYY, MM, DD)) {
    return;
  }

  const currentDate = new Date();
  let year = currentDate.getFullYear() - YYYY;
  let month = currentDate.getMonth() - new Date(dateTemplate).getMonth();
  let day = currentDate.getDate() - DD;

  if (month < 0) {
    year--;
    month += 12;
  }

  if (day < 0) {
    month--;
    if (month < 0) {
      month = 11;
    }
    day += new Date(YYYY, MM - 1, 0).getDate();
  }

  styleReset();
  yearOut.innerText = year;
  monthOut.innerText = month;
  dayOut.innerText = day;
});

//Date Input Validation

function validateInput(year, month, day) {
  let valid = true;

  if (year === undefined || year === "") {
    errorMessage(yearInput, "This field is required");
    valid = false;
  } else if (year > new Date().getFullYear()) {
    errorMessage(yearInput, "Must be in the past");
    valid = false;
  }

  if (month === undefined || month === "") {
    errorMessage(monthInput, "This field is required");
    valid = false;
  } else if (month > 12 || month < 1) {
    errorMessage(monthInput, "Must be a valid month");
    valid = false;
  }

  if (day === undefined || day === "") {
    errorMessage(dayInput, "This field is required");
    valid = false;
  } else if (day < 1 || day > new Date(year, month, 0).getDate()) {
    errorMessage(dayInput, "Must be a valid day");
    valid = false;
  }

  if (
    new Date().setHours(0, 0, 0, 0) <=
    new Date(year, month - 1, day).setHours(0, 0, 0, 0)
  ) {
    errorMessage(yearInput, "Must be in the past");
    valid = false;
  }

  return valid;
}

//Styling Functions

function errorMessage(HTMLelement, message) {
  HTMLelement.style.border = "0.5px solid var(--clr-primary-red)";
  HTMLelement.nextElementSibling.innerText = message;
  HTMLelement.previousElementSibling.style.color = "var(--clr-primary-red)";
}

function styleReset() {
  document.querySelectorAll(".inputField").forEach((element) => {
    element.style.border = "0.5px solid var(--clr-grey-200)";
    element.nextElementSibling.innerText = "";
    element.previousElementSibling.style.color = "var(--clr-grey-200)";
  });
}
