export const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const randomNumbersArray = (minNumber: number, maxNumber: number, minLength: number, maxLength: number): number[] => {
  const arr = new Array(randomNumber(minLength, maxLength));

  for (let i = 0; i < arr.length; i++) {
    arr[i] = randomNumber(minNumber, maxNumber);
  }

  return arr;
}
