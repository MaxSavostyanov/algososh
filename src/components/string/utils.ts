import { ElementStates } from '../../types/element-states';
import { ILetterWithState } from './types';

export const MAX_LENGTH = 11;

export const swap = (arr: ILetterWithState[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const stateCircle = (index: number, currIndex: number, arr: Array<string | number>) => {
  let arrLength = arr.length - 1;
  if (currIndex < index || currIndex > arrLength - index)
    return ElementStates.Modified

  if (currIndex === index || currIndex === arrLength - index)
    return ElementStates.Changing

  return ElementStates.Default
}