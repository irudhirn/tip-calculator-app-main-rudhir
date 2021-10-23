const billInput = document.querySelector(".bill--input");
const noOfPeople = document.querySelector(".number-of-people");
const billAmount = document.getElementById("bill");
const tips = document.querySelectorAll("[data-number]");
const customTip = document.getElementById("tip");
const peopleCount = document.getElementById("people");
const persons = document.querySelector(".persons");
const warning = document.querySelector("warning");
const form = document.getElementById("form");
const tipPerPerson = document.querySelector(".tip-person");
const totalPerPerson = document.querySelector(".total-person");
const reset = document.querySelector(".reset");

let bill = 0;
let billPerson = 0;
let tipPercent = 0;
let people = 0;
let personTip;
let personTotal;

reset.addEventListener("click", () => {
  bill = "";
  tipPercent = "";
  people = "";
  personTip = 0;
  personTotal = 0;
  billAmount.value = bill;
  customTip.value = tipPercent;
  peopleCount.value = people;
  // tipPerPerson.innerText = personTip;
  // totalPerPerson.innerText = personTotal;
  tipPerPerson.innerText = "$0.00";
  totalPerPerson.innerText = "$0.00";

  persons.classList.remove("alert");
  billInput.classList.remove("active");
  noOfPeople.classList.remove("active");
});

tips.forEach((tip) => {
  tip.addEventListener("click", (e) => {
    tipPercent = 0;
    billInput.classList.remove("active");
    noOfPeople.classList.remove("active");
    e.preventDefault();

    tipPercent = e.target.innerText.slice(0, -1);
    tipPercent = parseFloat(tipPercent / 100);

    if (bill === 0 || bill === "" || people === 0 || people === "") {
      return;
    } else {
      compute();
    }
  });
});

customTip.addEventListener("change", (e) => {
  tipPercent = 0;

  e.preventDefault();

  tipPercent = e.target.value;
  tipPercent = parseFloat(tipPercent / 100);

  if (bill === 0 || bill === "" || people === 0 || people === "") {
    return;
  } else {
    compute();
  }
});

customTip.addEventListener("click", (e) => {
  e.preventDefault();

  billInput.classList.remove("active");
  noOfPeople.classList.remove("active");
});

billAmount.addEventListener("click", (e) => {
  e.preventDefault();
  noOfPeople.classList.remove("active");
  billInput.classList.add("active");
});

billAmount.addEventListener("change", (e) => {
  bill = 0;

  e.preventDefault();
  bill = parseFloat((bill + e.target.value).toString().slice(1));

  if (tipPercent === 0 || tipPercent === "" || people === 0 || people === "") {
    return;
  } else {
    compute();
    billInput.classList.remove("active");
  }

  // console.log(bill);
  // console.log(typeof bill);
  // console.log(bill.toString().slice(1));
  // console.log(typeof bill.toString().slice(1));
  // console.log(parseFloat(bill.toString().slice(1)));
  // console.log(typeof parseFloat(bill.toString().slice(1)));
});

peopleCount.addEventListener("click", (e) => {
  e.preventDefault();
  billInput.classList.remove("active");
  noOfPeople.classList.add("active");
});

peopleCount.addEventListener("change", (e) => {
  people = 0;
  // persons.classList.remove("alert");

  e.preventDefault();

  people = parseFloat((people + e.target.value).toString().slice(1));

  if (people === 0) {
    persons.classList.add("alert");
    people = "";
    peopleCount.value = people;
    return;
  } else if (people >= 0) {
    persons.classList.remove("alert");
  }

  if (bill === 0 || bill === "" || tipPercent === 0 || tipPercent === "") {
    return;
  } else {
    compute();
    noOfPeople.classList.remove("active");
  }

  // console.log(people);
  // console.log(typeof people);
  // console.log(people.toString().slice(1));
  // console.log(typeof people.toString().slice(1));
  // console.log(parseFloat(people.toString().slice(1)));
  // console.log(typeof parseFloat(people.toString().slice(1)));
});

function compute() {
  billPerson = bill / people;
  personTip = billPerson * tipPercent;
  personTotal = billPerson + personTip;

  tipPerPerson.innerText = "$" + personTip.toFixed(2);
  totalPerPerson.innerText = "$" + personTotal.toFixed(2);
}
