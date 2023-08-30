import React, { FormEvent, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { DELAY_IN_MS, SHORT_DELAY_IN_MS, delay } from '../../constants/delays';
import { MAX_LENGTH } from './constants';
import { swap } from './utils';
import style from './string.module.css';
import { ElementStates } from '../../types/element-states';
import { ILetterWithState } from './types';

export const StringComponent: React.FC = () => {
  const [string, setString] = useState<string>('');
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [reversedString, setReversedString] = useState<ILetterWithState[] | null>(null);

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value.trim();
    setString(value);
  }

  const getReversedString = async (string: string): Promise<void> => {
    setIsLoader(true);

    const array: ILetterWithState[] = string.split('').map((item: string) => ({
      letter: item,
      state: ElementStates.Default
    }));

    let end = array.length - 1;

    setReversedString(array);

    await delay(SHORT_DELAY_IN_MS);

    for (let i = 0; i < array.length / 2; i++) {
      array[i].state = ElementStates.Changing;
      array[end].state = ElementStates.Changing;
      setReversedString([...array]);

      await delay(DELAY_IN_MS);

      swap(array, i, end);
      array[i].state = ElementStates.Modified;
      array[end].state = ElementStates.Modified;
      setReversedString([...array]);

      await delay(DELAY_IN_MS);
      end--;
    }

    setIsLoader(false);
    setString('');
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
          disabled={isLoader}
        />
        <Button
          text='Развернуть'
          disabled={!string}
          isLoader={isLoader}
          onClick={onClickReverse}
        />
      </form>

      {reversedString &&
        <ul className={style.list}>
          {reversedString.map((letter: ILetterWithState, index: number) => {
            return (
              <Circle
                letter={letter.letter}
                key={index}
                state={letter.state}
              />)
          })}
        </ul>}
    </SolutionLayout>
  );
};
