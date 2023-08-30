import { DELAY_IN_MS, SHORT_DELAY_IN_MS, delay } from '../../constants/delays';
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

export const getReversedString = async (string: string, setReversedString?: { (value: React.SetStateAction<ILetterWithState[] | null>): void; (arg0: ILetterWithState[]): void; }): Promise<ILetterWithState[]> => {
  const array: ILetterWithState[] = string.split('').map((item: string) => ({
    letter: item,
    state: ElementStates.Default
  }));

  let end = array.length - 1;

  setReversedString && setReversedString(array);

  await delay(SHORT_DELAY_IN_MS);

  for (let i = 0; i < array.length / 2; i++) {
    array[i].state = ElementStates.Changing;
    array[end].state = ElementStates.Changing;
    setReversedString && setReversedString([...array]);

    await delay(DELAY_IN_MS);

    swap(array, i, end);
    array[i].state = ElementStates.Modified;
    array[end].state = ElementStates.Modified;
    setReversedString && setReversedString([...array]);

    await delay(DELAY_IN_MS);
    end--;
  }

  return array;
}