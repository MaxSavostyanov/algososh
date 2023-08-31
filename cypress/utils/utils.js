import { loader } from '../constants/constants';

export const checkLoader = (button, exist) => {
  button.get(loader).should(exist);
};

