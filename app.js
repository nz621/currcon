
const countryList = {
  "AED": "AE",
  "ARS": "AR",
  "AUD": "AU",
  "BDT": "BD",
  "BRL": "BR",
  "CAD": "CA",
  "CHF": "CH",
  "CNY": "CN",
  "COP": "CO",
  "EGP": "EG",
  "EUR": "FR",
  "GBP": "GB",
  "HKD": "HK",
  "IDR": "ID",
  "INR": "IN",
  "JPY": "JP",
  "KRW": "KR",
  "MXN": "MX",
  "MYR": "MY",
  "NGN": "NG",
  "NOK": "NO",
  "NZD": "NZ",
  "PKR": "PK",
  "PHP": "PH",
  "PLN": "PL",
  "RUB": "RU",
  "SAR": "SA",
  "SEK": "SE",
  "SGD": "SG",
  "THB": "TH",
  "TRY": "TR",
  "TWD": "TW",
  "UAH": "UA",
  "USD": "US",
  "VND": "VN",
  "ZAR": "ZA"
};

const dropList = document.querySelectorAll("form select"),
      fromCurr = document.querySelector(".from select"),
      toCurr = document.querySelector(".to select"),
      getButton = document.querySelector("form button"),
      msg = document.querySelector(".msg"),
      switchIcon = document.querySelector(".icon i");

for (let i = 0; i < dropList.length; i++) {
  for (currCode in countryList) {
    let selected = (i == 0 && currCode == "USD") || (i == 1 && currCode == "INR") ? "selected" : "";
    let optionTag = `<option value="${currCode}" ${selected}>${currCode}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }

  dropList[i].addEventListener("change", e => {
    loadFlag(e.target);
  });
}

function loadFlag(element) {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let imgTag = element.parentElement.querySelector("img");
  imgTag.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

function getExchangeRate() {
  const amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal == "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const apiKey = "117f28819bfb5e1063b16408";
  let URL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurr.value}`;

  fetch(URL)
    .then(res => res.json())
    .then(result => {
      let exchangeRate = result.conversion_rates[toCurr.value];
      let totalExRate = (amtVal * exchangeRate).toFixed(2);
      msg.innerText = `${amtVal} ${fromCurr.value} = ${totalExRate} ${toCurr.value}`;
    })
    .catch(() => {
      msg.innerText = "Something went wrong";
    });
}

switchIcon.addEventListener("click", () => {
  let tempCode = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = tempCode;
  loadFlag(fromCurr);
  loadFlag(toCurr);
  getExchangeRate();
});

getButton.addEventListener("click", e => {
  e.preventDefault();
  getExchangeRate();
});

window.addEventListener("load", () => {
  getExchangeRate();
});
