const fs = require("fs");

function getFilledForm(resolvedForm) {
  var resolvedFormWithPrices = getWorkPrices(resolvedForm);
  var totalPrice = getTotalPrice(resolvedFormWithPrices);

  const result = {
    ...resolvedFormWithPrices,
    total: totalPrice,
  };

  return result;
  //var suggestions = OfferSuggestions(googleFormCSV);

  //  console.log(pricesAndSuggestions, totalPrice, suggestions);
}

/*
{
    'sdfgsdfgsdfg': 'dsfg',
    'sdfsdfgdsf': 'dfg'
}

{
    'dsfhgsdfgh': 54,
    'dsfgsd': 34,
    'total': 20
} */
function getItemPrice(workName, budget) {
  const streamPrices = fs.readFileSync(getPricesPath());
  const prices = JSON.parse(streamPrices);
  const itemPrice = prices[workName][budget];

  return itemPrice;
}
function getPricesPath() {
  var filePathPrices = "./prices.json";
  return filePathPrices;
}
function getWorkPrices(resolvedForm) {
  const result = JSON.parse(JSON.stringify(resolvedForm));

  Object.keys(resolvedForm).forEach((workName) => {
    const value = resolvedForm[workName];
    if (value !== "not interested" && value) {
      result[workName] = getItemPrice(workName, value);
    } else {
      result[workName] = 0;
    }
  });

  return result;
}
function getTotalPrice(resolvedFormWithPrices) {
  var totalPrice = 0;

  for (const [Key, value] of Object.entries(resolvedFormWithPrices)) {
    totalPrice = totalPrice + parseInt(value);
  }
  return totalPrice;
}

module.exports = getFilledForm;
