const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
// const BASE_URL = `https://api.exchangerate-api.com/v4/latest/USD`;

const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");


// countrycode options

for (let select of dropdowns){
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText  = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD"){
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR"){
      newOption.selected = "selected";
    }

    select.append(newOption);
  }
  select.addEventListener("change", (e) =>{
    updateFlag(e.target);
  })

}




// updating images according to country code

const updateFlag = (el) => {
  let currCode = el.value;
  // console.log(currCode);
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`  // IN EU 
  let img = el.parentElement.querySelector("img");
  img.src=newSrc; 

}


//  accessing input using button

btn.addEventListener("click", async (e) =>{
  e.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  // console.log(amtVal);
  if(amtVal === "" || amtVal < 1){
    amtVal = 1;
    amount.value = "1";
  }
  // console.log(amtVal);

  // console.log(fromCurr.value,toCurr.value);
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  console.log(data);
})


