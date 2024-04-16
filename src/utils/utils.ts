export function getRandomInt(min: number, max: number) {
  const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomInt.toString();
}

export enum CalculatorType {
  totalDataStored = "Total Data Stored",
  monthlyDownloadedData = "Monthly Downloaded Data",
}
