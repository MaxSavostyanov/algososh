import { ElementStates } from '../../types/element-states';

export type TValue = string | number;
export type TPosition = 'up' | 'down'

export interface IShiftItem {
  value: TValue,
  state: ElementStates,
  position: TPosition,
}

export interface IListItem {
  value: TValue,
  state: ElementStates,
  shiftElement: IShiftItem | null,
}

export interface IStateLoader {
  prepend: boolean,
  append: boolean,
  addByIndex: boolean,

  deleteHead: boolean,
  deleteTail: boolean,
  deleteByIndex: boolean,
}

export type TAction =
  'prepend'
  | 'append'
  | 'addByIndex'
  | 'deleteHead'
  | 'deleteTail'
  | 'deleteByIndex';