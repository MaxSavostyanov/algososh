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

export const selectionAlgorithm = (array: Array<number>, direction: Direction): Array<number> => {
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < array.length; j++) {
      if (compare(array, minIndex, j, direction)) {
        minIndex = j;
      }
    }

    swap(array, i, minIndex);
  }

  return array;
};

export const bubbleAlgorithm = (array: number[], direction: Direction): Array<number> => {
  for (let i = array.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (compare(array, j, j + 1, direction)) {
        swap(array, j, j + 1);
      }
    }
  }

  return array;
};