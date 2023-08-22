import { Direction } from '../../types/direction';

export const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const randomNumbersArray = (minNumber: number, maxNumber: number, minLength: number, maxLength: number): number[] => {
  const arr = new Array(randomNumber(minLength, maxLength));

  for (let i = 0; i < arr.length; i++) {
    arr[i] = randomNumber(minNumber, maxNumber)
  }

  return arr;
}

export const swap = (arr: number[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const compare = (array: Array<number>, first: number, second: number, direction: Direction) => {
  return direction === Direction.Ascending
    ? array[first] > array[second]
    : array[first] < array[second];
}

