import React, { FormEvent, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { SHORT_DELAY_IN_MS, delay } from '../../constants/delays';
import { MAX_LENGTH, MIN_VALUE, MAX_VALUE } from './constants';
import { getFibonacciNumbers } from './utils';
import style from './fibonacci-page.module.css';

export const FibonacciPage: React.FC = () => {
  const [number, setNumber] = useState<number | string>('');
  const [fibonacciArray, setFibonacciArray] = useState<Array<number> | null>(null)
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [length, setLength] = useState<number>(0);

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    const value = +e.currentTarget.value.trim();
    setNumber(value);
    setFibonacciArray(null);
  }

  const isDisabled = MIN_VALUE <= +number && +number <= MAX_VALUE ? false : true;

  const getFibonacciArray = async (number: number) => {
    setIsLoader(true);

    const fibonacciArray = getFibonacciNumbers(number);

    for (let i = 0; i <= fibonacciArray.length; i++) {
      setFibonacciArray(fibonacciArray.slice(0, i + 1));
      setLength(i);
      await delay(SHORT_DELAY_IN_MS);
    }

    setIsLoader(false);
    setNumber('');
  }

  const onClick = (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    getFibonacciArray(+number)
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form
        className={style.form}
        onSubmit={onClick}
      >
        <Input
          type='number'
          extraClass='mr-6'
          value={!number ? '' : number}
          maxLength={MAX_LENGTH}
          max={MAX_VALUE}
          isLimitText={true}
          onChange={onChange}
          disabled={isLoader}
        />
        <Button
          text='Рассчитать'
          disabled={isDisabled}
          isLoader={isLoader}
          onClick={onClick}
        />
      </form>
      {fibonacciArray &&
        <ul
          className={`${style.list}`}
          style={{ justifyContent: length < 10 ? 'center' : 'flex-start' }}>
          {fibonacciArray.map((number: number, index: number) => {
            return (
              <Circle
                letter={`${number}`}
                key={index}
                index={index}
              />)
          })}
        </ul>}
    </SolutionLayout>
  );
};
