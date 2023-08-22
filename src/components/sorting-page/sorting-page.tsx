import React, { useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Button } from '../ui/button/button';
import { Column } from '../ui/column/column';
import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';
import { DELAY_IN_MS, delay } from '../../constants/delays';
import {
  MIN_LENGTH,
  MAX_LENGTH,
  MIN_NUMBER,
  MAX_NUMBER,
  BUBBLE_NAME,
  SELECTION_NAME,
} from './constants';
import { randomNumbersArray, swap, compare } from './utils';
import style from './sorting-page.module.css';

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<number[]>(randomNumbersArray(MIN_NUMBER, MAX_NUMBER, MIN_LENGTH, MAX_LENGTH));
  const [radioActive, setRadioActive] = useState<'selection' | 'bubble'>('selection');
  const [btnActive, setBtnActive] = useState<string | null>(null);

  const [firstIndex, setFirstIndex] = useState<number | null>(null);
  const [secondIndex, setSecondIndex] = useState<number | null>(null);
  const [currIndex, setCurrIndex] = useState<number | null>(null);

  const setRadio = (radio: 'selection' | 'bubble') => {
    setRadioActive(radio);
    setBtnActive(null);
    setCurrIndex(null);
  };

  const setDirection = (direction: Direction) => {
    setBtnActive(direction);
    setCurrIndex(null);
    sort(direction);
  };

  const getState = (index: number): ElementStates | undefined => {
    if (index === firstIndex || index === secondIndex)
      return ElementStates.Changing;

    if (currIndex === null) return ElementStates.Default;

    const isSortedElement =
      radioActive === 'selection'
        ? index <= currIndex
        : index >= currIndex;

    if (isSortedElement) return ElementStates.Modified;
  };

  const selectionAlgorithm = async (array: Array<number>, direction: Direction) => {
    for (let i = 0; i < array.length - 1; i++) {
      let minIndex = i;
      setFirstIndex(i);

      for (let j = i + 1; j < array.length; j++) {
        setSecondIndex(j);
        await delay(DELAY_IN_MS);
        if (compare(array, minIndex, j, direction)) {
          minIndex = j;
        }
      }
      swap(array, i, minIndex);
      setArray([...array]);
      setCurrIndex(i);
    }
    setBtnActive(null);
    setFirstIndex(null);
    setSecondIndex(null);
    setCurrIndex(array.length - 1);
  };

  const bubbleAlgorithm = async (array: number[], direction: Direction) => {
    for (let i = array.length - 1; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        setFirstIndex(j);
        setSecondIndex(j + 1);

        await delay(DELAY_IN_MS);
        if (compare(array, j, j + 1, direction)) {
          swap(array, j, j + 1);
          setArray([...array]);
        }
      }
      setCurrIndex(i);
    }
    setBtnActive(null);
    setFirstIndex(null);
    setSecondIndex(null);
    setCurrIndex(0);
  };

  const sort = (direction: Direction) => {
    if (radioActive === 'bubble') {
      bubbleAlgorithm(array, direction);
    } else {
      selectionAlgorithm(array, direction);
    }
  };

  return (
    <SolutionLayout title='Сортировка массива'>
      <form className={style.form}>
        <div className={style.group}>
          <RadioInput
            extraClass='mr-20'
            label={SELECTION_NAME}
            value={SELECTION_NAME}
            name='sort-type'
            onClick={() => setRadio('selection')}
            disabled={btnActive !== null}
            defaultChecked
          />
          <RadioInput
            label={BUBBLE_NAME}
            value={BUBBLE_NAME}
            name='sort-type'
            onClick={() => setRadio('bubble')}
            disabled={btnActive !== null}
          />
        </div>
        <div className={style.group}>
          <Button
            extraClass='mr-6'
            type='button'
            text='По возрастанию'
            sorting={Direction.Ascending}
            disabled={btnActive !== null}
            isLoader={btnActive === Direction.Ascending}
            onClick={() => setDirection(Direction.Ascending)}
          />
          <Button
            extraClass='mr-40'
            type='button'
            text='По убыванию'
            sorting={Direction.Descending}
            disabled={btnActive !== null}
            isLoader={btnActive === Direction.Descending}
            onClick={() => setDirection(Direction.Descending)}
          />
          <Button
            text='Новый массив'
            disabled={btnActive !== null}
            onClick={() => {
              setArray(randomNumbersArray(MIN_NUMBER, MAX_NUMBER, MIN_LENGTH, MAX_LENGTH));
              setCurrIndex(null);
            }}
          />
        </div>
      </form>

      <ul className={style.list}>
        {array.map((item: number, index: number) => {
          return (
            <Column
              key={index}
              index={item}
              state={getState(index)}
            />)
        })}
      </ul>
    </SolutionLayout>
  );
};
