import React, { useState, FormEvent } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { SHORT_DELAY_IN_MS, delay } from '../../constants/delays';
import { MAX_LENGTH, MAX_SIZE } from './constants';
import style from './stack-page.module.css';
import { Stack } from './Stack';

const stack = new Stack<string>();

export const StackPage: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [stackArray, setStackArray] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoader, setLoader] = useState<boolean>(false);
  const [isClear, setClear] = useState<boolean>(false);

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value.trim();
    setValue(value);
  }

  const push = async (item: string) => {
    setLoader(true);

    stack.push(item);
    setStackArray(stack.printStack());

    await delay(SHORT_DELAY_IN_MS);

    setCurrentIndex(currentIndex + 1);
    setValue('');

    setLoader(false);
  }

  const pop = async () => {
    setLoader(true);

    setCurrentIndex(stack.getSize() - 1);

    await delay(SHORT_DELAY_IN_MS);

    stack.pop();
    setStackArray([...stack.printStack()]);

    setLoader(false);
  }

  const peak = (index: number) => {
    return stack.peak() === index ? 'top' : '';
  }

  const clear = async () => {
    setClear(true);

    await delay(SHORT_DELAY_IN_MS);

    stack.clear();
    setStackArray(stack.printStack());
    setCurrentIndex(0);

    setClear(false);
  }

  const setState = (index: number) => {
    return index === currentIndex || isClear ? ElementStates.Changing : ElementStates.Default;
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    push(value);
  }

  const onReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clear();
  }

  return (
    <SolutionLayout title='Стек'>
      <form
        className={style.form}
        onSubmit={onSubmit}
        onReset={onReset}
      >
        <div className={style.inputGroup}>
          <Input
            extraClass='mr-6'
            value={value}
            maxLength={MAX_LENGTH}
            isLimitText={true}
            onChange={onChange}
            disabled={isLoader || stackArray.length > MAX_SIZE}
          />

          <Button
            type='submit'
            text='Добавить'
            extraClass='mr-6'
            disabled={!value || isLoader || stackArray.length > MAX_SIZE}
          />

          <Button
            text='Удалить'
            disabled={isLoader || stackArray.length <= 0}
            onClick={pop}
          />
        </div>

        <Button
          type='reset'
          text='Очистить'
          disabled={isLoader || stackArray.length <= 0}
        />
      </form>

      <ul className={style.list}>
        {stackArray.map((item, index: number) => {
          return (
            <Circle
              letter={item}
              key={index}
              index={index}
              head={peak(index)}
              state={setState(index)}
            />)
        })}
      </ul>
    </SolutionLayout>
  );
};
