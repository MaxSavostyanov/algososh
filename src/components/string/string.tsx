import React, { FormEvent, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { MAX_LENGTH } from './constants';
import { getReversedString} from './utils';
import style from './string.module.css';
import { ILetterWithState } from './types';

export const StringComponent: React.FC = () => {
  const [string, setString] = useState<string>('');
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [reversedString, setReversedString] = useState<ILetterWithState[] | null>(null);

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value.trim();
    setString(value);
  }

  const onClickReverse = async (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoader(true);

    await getReversedString(string, setReversedString);

    setIsLoader(false);
    setString('');
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
