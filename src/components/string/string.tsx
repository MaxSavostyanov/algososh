import React, { FormEvent, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { DELAY_IN_MS, delay } from '../../constants/delays';
import { MAX_LENGTH } from './constants';
import { stateCircle, swap } from './utils';
import style from './string.module.css';

export const StringComponent: React.FC = () => {
  const [string, setString] = useState<string>('');
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [currIndex, setCurrIndex] = useState<number>(0);
  const [reversedString, setReversedString] = useState<Array<string>>([]);

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value.trim();
    setString(value);
  }

  const getReversedString = async (string: string): Promise<string[]> => {
    setIsLoader(true);

    const array = string.split('');
    let end = array.length - 1;

    setCurrIndex(0);
    setReversedString([...array]);

    await delay(DELAY_IN_MS);

    for (let i = 0; i < Math.floor(array.length / 2); i++) {
      swap(array, i, end);
      setCurrIndex(i => i + 1);
      setReversedString([...array]);
      await delay(DELAY_IN_MS);
      end--;
    }

    setCurrIndex(i => i + 1);
    setIsLoader(false);

    return array;
  }

  const onClickReverse = (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    getReversedString(string);
  }

  return (
    <SolutionLayout title='Строка'>
      <form
        className={style.form}
        onSubmit={onClickReverse}
      >
        <Input
          extraClass='mr-6'
          value={string}
          maxLength={MAX_LENGTH}
          isLimitText={true}
          onChange={onChange}
        />
        <Button
          text='Развернуть'
          disabled={!string}
          isLoader={isLoader}
          onClick={onClickReverse}
        />
      </form>
      <ul className={style.list}>
        {reversedString.map((letter: string, index: number) => {
          return (
            <Circle
              letter={letter}
              key={index}
              state={stateCircle(currIndex, index, reversedString)}
            />)
        })}
      </ul>
    </SolutionLayout>
  );
};
