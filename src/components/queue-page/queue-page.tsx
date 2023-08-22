import React, { useState, FormEvent } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { SHORT_DELAY_IN_MS, delay } from '../../constants/delays';
import { HEAD, TAIL } from '../../constants/element-captions';
import { Queue } from './Queue';
import { SIZE, MAX_LENGTH } from './constants';
import style from './queue-page.module.css';

const queue = new Queue<string>(SIZE);

export const QueuePage: React.FC = () => {
  const [queueArray, setQueueArray] = useState<(string | undefined)[]>(queue.printQueue());
  const [head, setHead] = useState<number>(queue.getHead());
  const [tail, setTail] = useState<number>(queue.getTail());

  const [value, setValue] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const [isLoader, setLoader] = useState<boolean>(false);
  const [isClear, setClear] = useState<boolean>(false);
  const [startedLine, setStartedLine] = useState<boolean>(false);

  const enqueue = async (item: string) => {
    setLoader(true);

    if (queue.isEmpty()) {
      setStartedLine(true);
    }

    queue.enqueue(item);
    setCurrentIndex(tail % queue.getSize());
    setTail(queue.getTail());

    await delay(SHORT_DELAY_IN_MS);

    setValue('');
    setQueueArray([...queue.printQueue()]);
    setCurrentIndex(-1);

    await delay(SHORT_DELAY_IN_MS);

    setLoader(false);
  }

  const dequeue = async () => {
    setLoader(true);
    
    if (queue) {
      queue.dequeue();
      setCurrentIndex((head & queue.getSize()));

      await delay(SHORT_DELAY_IN_MS);

      setQueueArray([...queue.printQueue()]);
      setHead(queue.getHead());
      setCurrentIndex(-1);

      await delay(SHORT_DELAY_IN_MS);
    }

    setLoader(false);
  }

  const clear = async () => {
    setClear(true);

    await delay(SHORT_DELAY_IN_MS);

    queue.clear();
    setQueueArray(queue.printQueue());
    setStartedLine(false);
    setHead(queue.getHead());
    setTail(queue.getTail());


    setClear(false);
  }

  const isHead = (index: number) => {
    return index === head && startedLine ? HEAD : '';
  }

  const isTail = (index: number) => {
    return index === tail - 1 && !queue.isEmpty() ? TAIL : '';
  }

  const setState = (index: number) => {
    return index === currentIndex || isClear ? ElementStates.Changing : ElementStates.Default;
  }

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value.trim();
    setValue(value);
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    enqueue(value);
  }

  const onReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clear();
  }

  return (
    <SolutionLayout title='Очередь'>
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
            disabled={isLoader}
          />

          <Button
            type='submit'
            text='Добавить'
            extraClass='mr-6'
            disabled={!value || isLoader || tail === SIZE}
          />

          <Button
            text='Удалить'
            disabled={isLoader || queue.isEmpty()}
            onClick={dequeue}
          />
        </div>

        <Button
          type='reset'
          text='Очистить'
          disabled={isLoader || (head === 0 && tail === 0)}
        />
      </form>

      <ul className={style.list}>
        {queueArray.map((item, index: number) => {
          return (
            <Circle
              letter={item}
              key={index}
              index={index}
              head={isHead(index)}
              tail={isTail(index)}
              state={setState(index)}
            />)
        })}
      </ul>
    </SolutionLayout>
  );
};
