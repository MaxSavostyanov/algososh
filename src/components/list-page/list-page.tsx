import React, { useState, FormEvent } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { ElementStates } from '../../types/element-states';
import { SHORT_DELAY_IN_MS, delay } from '../../constants/delays';
import {
  MAX_LENGTH,
  MAX_NUMBER,
  MIN_NUMBER,
  MAX_SIZE,
  MIN_SIZE
} from './constants';
import { randomNumbersArray } from './utils';
import { LinkedList } from './LinkedList';
import { IListItem, IStateLoader, TAction, TValue, TPosition } from './types';
import style from './list-page.module.css';
import { HEAD, TAIL } from '../../constants/element-captions';

const randomArray = randomNumbersArray(MIN_NUMBER, MAX_NUMBER, MAX_SIZE - 1, MIN_SIZE);

const randomListItemArray: IListItem[] = randomArray.map((item) => ({
  value: item,
  state: ElementStates.Default,
  shiftElement: null,
}))

export const ListPage: React.FC = () => {
  const [listArray, setListArray] = useState<IListItem[]>(randomListItemArray);

  const [value, setValue] = useState<string>('');
  const [index, setIndex] = useState<number | ''>('');

  const [disabled, setDisabled] = useState<boolean>(false);
  const [stateLoader, setStateLoader] = useState<IStateLoader>({
    prepend: false,
    append: false,
    addByIndex: false,
    deleteHead: false,
    deleteTail: false,
    deleteByIndex: false,
  });

  const list = new LinkedList<TValue>(randomArray);

  const onChangeValue = (e: FormEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value.trim();
    setValue(value);
  }

  const onChangeIndex = (e: FormEvent<HTMLInputElement>): void => {
    const index = e.currentTarget.value.trim();
    setIndex(+index);
  }

  const isHead = (item: IListItem, index: number): string => {
    return index === 0 && !item.shiftElement ? HEAD : '';
  }

  const isTail = (item: IListItem, index: number): string => {
    return index === listArray.length - 1 && !item.shiftElement ? TAIL : '';
  }

  const startAction = (action: TAction): void => {
    setDisabled(true);
    setStateLoader({ ...stateLoader, [action]: true });
  }

  const endAction = (action: TAction): void => {
    setListArray([...listArray]);
    setStateLoader({ ...stateLoader, [action]: false });
    setDisabled(false);
    setIndex('');
    setValue('');
  }

  const showShiftElement = (
    value: TValue,
    index: number,
    position: TPosition
  ): void => {
    if (position === 'down') listArray[index].value = '';

    listArray[index].shiftElement = {
      value: value,
      state: ElementStates.Changing,
      position: position,
    }
  }

  const hideShiftElement = (index: number): void => {
    listArray[index].shiftElement = null
  }

  const changeStateElement = (
    state: ElementStates,
    index: number = -1
  ): void => {
    if (index !== -1) listArray[index].state = state;
    else {
      listArray.forEach((item: IListItem) => {
        item.state = state;
      })
    }
  }

  const makeNewHead = async (): Promise<void> => {
    listArray.push({
      ...listArray[0],
      value: '',
      state: ElementStates.Default
    });
    setListArray([...listArray]);

    await delay(SHORT_DELAY_IN_MS);

    showShiftElement(value, 0, 'up');
    setListArray([...listArray]);

    await delay(SHORT_DELAY_IN_MS);

    hideShiftElement(0);
    listArray[0] = ({
      ...listArray[0],
      value: value,
      state: ElementStates.Modified
    });
  }

  const onClickPrepend = async (
    action: TAction = 'prepend'
  ): Promise<void> => {
    startAction(action);
    list.prepend(value);

    if (listArray.length === 0) {
      await makeNewHead();
    } else {
      showShiftElement(value, 0, 'up');
      setListArray([...listArray]);

      await delay(SHORT_DELAY_IN_MS);

      hideShiftElement(0);
      listArray.unshift({
        ...listArray[0],
        value: value,
        state: ElementStates.Modified
      });
    }
    setListArray([...listArray]);

    await delay(SHORT_DELAY_IN_MS);

    changeStateElement(ElementStates.Default, 0);

    endAction(action);
  }

  const onClickAppend = async (
    action: TAction = 'append'
  ): Promise<void> => {
    startAction(action);
    list.prepend(value);

    if (listArray.length === 0) {
      await makeNewHead();
    } else {
      showShiftElement(value, listArray.length - 1, 'up');
      setListArray([...listArray]);

      await delay(SHORT_DELAY_IN_MS);

      hideShiftElement(listArray.length - 1);
      listArray.push({
        value: value,
        state: ElementStates.Modified,
        shiftElement: null,
      });
    }
    setListArray([...listArray]);

    await delay(SHORT_DELAY_IN_MS);

    changeStateElement(ElementStates.Default, listArray.length - 1);

    endAction(action);
  }

  const onClickAddByIndex = async (
    action: TAction = 'addByIndex'
  ): Promise<void> => {
    if (listArray.length === 0 && index === 0) onClickPrepend();
    else {
      startAction(action);
      list.addByIndex(value, +index);

      for (let i = 0; i <= +index; i++) {
        changeStateElement(ElementStates.Changing, i);
        showShiftElement(value, i, 'up');

        await delay(SHORT_DELAY_IN_MS);

        setListArray([...listArray]);
        if (i > 0) hideShiftElement(i - 1);
        setListArray([...listArray]);
      }

      await delay(SHORT_DELAY_IN_MS);

      hideShiftElement(+index);
      listArray.splice(+index, 0, {
        value: value,
        state: ElementStates.Modified,
        shiftElement: null,
      });
      setListArray([...listArray]);

      await delay(SHORT_DELAY_IN_MS);

      changeStateElement(ElementStates.Default);

      await delay(SHORT_DELAY_IN_MS);

      endAction(action);
    }
  }

  const onClickDeleteHead = async (
    action: TAction = 'deleteHead'
  ): Promise<void> => {
    startAction(action);

    showShiftElement(listArray[0].value, 0, 'down');

    list.deleteHead();
    setListArray([...listArray]);

    await delay(SHORT_DELAY_IN_MS);

    listArray.shift();

    endAction(action);
  }

  const onClickDeleteTail = async (
    action: TAction = 'deleteTail'
  ): Promise<void> => {
    let indexTail = listArray.length - 1;
    startAction(action);

    showShiftElement(listArray[indexTail].value, indexTail, 'down');

    list.deleteTail();
    setListArray([...listArray]);

    await delay(SHORT_DELAY_IN_MS);

    listArray.pop();

    endAction(action);
  }

  const onClickDeleteByIndex = async (
    action: TAction = 'deleteByIndex'
  ): Promise<void> => {
    startAction(action);

    for (let i = 0; i <= +index; i++) {
      changeStateElement(ElementStates.Changing, i);
      setListArray([...listArray]);

      await delay(SHORT_DELAY_IN_MS);
    }

    showShiftElement(listArray[+index].value, +index, 'down');
    setListArray([...listArray]);

    await delay(SHORT_DELAY_IN_MS);

    listArray.splice(+index, 1)
    setListArray([...listArray]);

    await delay(SHORT_DELAY_IN_MS);

    changeStateElement(ElementStates.Default);

    endAction(action);
  }

  return (
    <SolutionLayout title='Связный список'>
      <form className={style.form} onSubmit={(e) => e.preventDefault()}>
        <Input
          extraClass={`${style.input} mr-6`}
          value={value}
          placeholder='Введите значение'
          maxLength={MAX_LENGTH}
          isLimitText={true}
          onChange={onChangeValue}
          disabled={disabled}
        />

        <div className={style.btnsGroup}>
          <Button
            extraClass={style.btnSmall}
            text='Добавить в head'
            onClick={() => onClickPrepend()}
            isLoader={stateLoader.prepend}
            disabled={!value || disabled || listArray.length >= MAX_SIZE}
          />

          <Button
            extraClass={style.btnSmall}
            text='Добавить в tail'
            onClick={() => onClickAppend()}
            isLoader={stateLoader.append}
            disabled={!value || disabled || listArray.length >= MAX_SIZE}
          />

          <Button
            extraClass={style.btn_small}
            text='Удалить из head'
            onClick={() => onClickDeleteHead()}
            isLoader={stateLoader.deleteHead}
            disabled={disabled || listArray.length <= 0}
          />

          <Button
            extraClass={style.btn_small}
            text='Удалить из tail'
            onClick={() => onClickDeleteTail()}
            isLoader={stateLoader.deleteTail}
            disabled={disabled || listArray.length <= 0}
          />
        </div>
      </form>
      <form className={style.form} onSubmit={(e) => e.preventDefault()}>
        <Input
          extraClass={`${style.input} mr-6`}
          type='number'
          value={index}
          placeholder='Введите индекс'
          max={MAX_SIZE - 1}
          isLimitText={false}
          onChange={onChangeIndex}
          disabled={disabled}
        />

        <div className={style.btnsGroup}>
          <Button
            extraClass={`${style.btnLarge} mr-6`}
            text='Добавить по индексу'
            onClick={() => onClickAddByIndex()}
            isLoader={stateLoader.addByIndex}
            disabled={
              (listArray.length === 0 && index === 0 && value)
                ? false
                : (!value && !index)
                || disabled
                || +index < 0
                || +index > listArray.length - 1
                || listArray.length >= MAX_SIZE
            }
          />

          <Button
            extraClass={`${style.btnLarge}`}
            text='Удалить по индексу'
            onClick={() => onClickDeleteByIndex()}
            isLoader={stateLoader.deleteByIndex}
            disabled={
              !index
              || listArray.length === 0
              || disabled
              || +index > listArray.length - 1
              || +index < 0
            }
          />
        </div>
      </form>

      <ul className={style.list}>
        {listArray.map((item, index) => {
          return (
            <li className={style.item} key={index}>
              {item.shiftElement && (
                <Circle
                  extraClass={`${style.circleSmall} ${style[`${item.shiftElement.position}`]}`}
                  letter={`${item.shiftElement.value}`}
                  state={item.shiftElement.state}
                  isSmall
                />
              )}
              <Circle
                extraClass='mr-12 ml-12'
                letter={`${item.value}`}
                index={index}
                head={isHead(item, index)}
                tail={isTail(item, index)}
                state={item.state}
              />
              {index < listArray.length - 1 &&
                <ArrowIcon fill={item.state === ElementStates.Changing ? '#d252e1' : '#0032FF'} />}
            </li>)
        })}
      </ul>
    </SolutionLayout>
  );
};
