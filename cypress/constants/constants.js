export const circle = '[data-cy="circle"]';
export const circleSmall = '[data-cy="circle-small"]';
export const circleBorder = '[data-cy="circle-border"]';
export const loader = '[data-cy="loader"]';

export const defaultStyle = 'rgb(0, 50, 255)';
export const changingStyle = 'rgb(210, 82, 225)';
export const modifiedStyle = 'rgb(127, 224, 81)';

export const fibArray = [1, 1, 2, 3, 5, 8];

export const string = '12345';

export const stringSteps = [
 [
  { textContent: '1', color: defaultStyle },
  { textContent: '2', color: defaultStyle },
  { textContent: '3', color: defaultStyle },
  { textContent: '4', color: defaultStyle },
  { textContent: '5', color: defaultStyle },
 ],
 [
  { textContent: '1', color: changingStyle },
  { textContent: '2', color: defaultStyle },
  { textContent: '3', color: defaultStyle },
  { textContent: '4', color: defaultStyle },
  { textContent: '5', color: changingStyle },
 ],
 [
  { textContent: '5', color: modifiedStyle },
  { textContent: '2', color: defaultStyle },
  { textContent: '3', color: defaultStyle },
  { textContent: '4', color: defaultStyle },
  { textContent: '1', color: modifiedStyle },
 ],
 [
  { textContent: '5', color: modifiedStyle },
  { textContent: '2', color: changingStyle },
  { textContent: '3', color: defaultStyle },
  { textContent: '4', color: changingStyle },
  { textContent: '1', color: modifiedStyle },
 ],
 [
  { textContent: '5', color: modifiedStyle },
  { textContent: '4', color: modifiedStyle },
  { textContent: '3', color: defaultStyle },
  { textContent: '2', color: modifiedStyle },
  { textContent: '1', color: modifiedStyle },
 ],
 [
  { textContent: '5', color: modifiedStyle },
  { textContent: '4', color: modifiedStyle },
  { textContent: '3', color: changingStyle },
  { textContent: '2', color: modifiedStyle },
  { textContent: '1', color: modifiedStyle },
 ],
 [
  { textContent: '5', color: modifiedStyle },
  { textContent: '4', color: modifiedStyle },
  { textContent: '3', color: modifiedStyle },
  { textContent: '2', color: modifiedStyle },
  { textContent: '1', color: modifiedStyle },
 ],
];
