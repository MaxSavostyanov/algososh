import { ElementStates } from '../../../types/element-states';
import { ILetterWithState } from '../types';
import { getReversedString } from '../utils';

const evenLength: string = '1234';
const oddLength: string = '123';

const evenSuccessResult: ILetterWithState[] = [
  { letter: '4', state: ElementStates.Modified },
  { letter: '3', state: ElementStates.Modified },
  { letter: '2', state: ElementStates.Modified },
  { letter: '1', state: ElementStates.Modified }
]

const oddSuccessResult: ILetterWithState[] = [
  { letter: '3', state: ElementStates.Modified },
  { letter: '2', state: ElementStates.Modified },
  { letter: '1', state: ElementStates.Modified }
]

describe('Тестирование алгоритма разворота строки', () => {
  test('строка с чётным количеством символов', async () => {
    await getReversedString(evenLength).then(res => {
      expect(res).toEqual(evenSuccessResult)
    })
  })

  test('строка с нечетным количеством символов', async () => {
    await getReversedString(oddLength).then(res => {
      expect(res).toEqual(oddSuccessResult)
    })
  })

  test('строка с одним символом', async () => {
    await getReversedString('1').then(res => {
      expect(res).toEqual([{ letter: '1', state: ElementStates.Modified }])
    })
  })

  test('пустая строка', async () => {
    await getReversedString('').then((res) => {
      expect(res).toEqual([])
    })
  })
})
