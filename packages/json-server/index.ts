import { tendenzApiSigmaYesterday } from "@tendenz/types";

module.exports = (): { "us-stocks-daily": tendenzApiSigmaYesterday } =>
  constructData();

function constructData() {
  return {
    "us-stocks-daily": constructUsStockDaily(),
  };
}
function constructUsStockDaily() {
  throw new Error("Function not implemented.");
}

// Define a function to generate random numbers within a range
function getRandomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// Define a function to generate a random date within a specified range
function getRandomDate(startDate: Date, endDate: Date) {
  const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
  return new Date(randomTime);
}

function generateFakeTendenzApiSigmaYesterday(): tendenzApiSigmaYesterday {
  return {
    ticker: () => 'TICKER_SYMBOL',
    name: () => 'Company Name',
    type: () => 'stockTypeCode', 
    primaryExchange: () => 'Primary Exchange',
    sigma: () => getRandomNumber(0, 20), 
    marketCap: () => getRandomNumber(1000000, 1000000000), 
    last: {
      close: () => getRandomNumber(1, 100), 
      date: () => getRandomDate(new Date(2022, 0, 1), new Date()), 
    },
    secondLast: {
      close: () => getRandomNumber(1, 100), 
      date: () => getRandomDate(new Date(2022, 0, 1), new Date()), 
    },
  };

  // Call each function to get the actual data
  const populatedData = Object.fromEntries(
    Object.entries(fakeData).map(([(key), value]) => [key as keyof typeof fakeData, value])
  );

  return populatedData;
}

// Create a function to generate an array of fake tendenzApiSigmaYesterday data
function generateFakeTendenzApiSigmaYesterdayArray(count: number): tendenzApiSigmaYesterday[] {
  const fakeDataArray: tendenzApiSigmaYesterday[] = [];
  for (let i = 0; i < count; i++) {
    fakeDataArray.push(generateFakeTendenzApiSigmaYesterday());
  }
  return fakeDataArray;
}

// Usage example:
const fakeDataArray = generateFakeTendenzApiSigmaYesterdayArray(10); // Generate an array of 10 fake entries
console.log(fakeDataArray);
In this updated example, each key in the tendenzApiSigmaYesterday object is associated with an anonymous function that returns a fake value when called. The generateFakeTendenzApiSigmaYesterday function populates the data by calling these functions and returns an object with actual data.




