import { selectionAlgorithm, bubbleAlgorithm } from '../utils';
import { Direction } from '../../../types/direction';


const testArray: Array<number> = [88, 15, 12, 98, 85];

const successArray: Array<number> = [12, 15, 85, 88, 98];

describe('Тестирование алгоритмов сортировки выбором и пузырьком', () => {
  test('Алгоритм сортировки выбором: пустой массив', () => {
    expect(selectionAlgorithm([], Direction.Ascending)).toEqual([])
  })

  test('Алгоритм сортировки выбором: массив из одного эле-та', () => {
    expect(selectionAlgorithm([33], Direction.Ascending)).toEqual([33])
  })

  test('Алгоритм сортировки выбором: массив из нескольких эл-тов', () => {
    expect(selectionAlgorithm(testArray, Direction.Ascending)).toEqual(successArray)
  })

  test('Алгоритм сортировки пузырьком: пустой массив', () => {
    expect(bubbleAlgorithm([], Direction.Ascending)).toEqual([])
  })

  test('Алгоритм сортировки пузырьком: массив из одного эле-та', () => {
    expect(bubbleAlgorithm([33], Direction.Ascending)).toEqual([33])
  })

  test('Алгоритм сортировки пузырьком: массив из нескольких эл-тов', () => {
    expect(bubbleAlgorithm(testArray, Direction.Ascending)).toEqual(successArray)
  })

})
