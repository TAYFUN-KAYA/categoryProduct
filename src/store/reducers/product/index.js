import {PRODUCT_ACTION} from '../../types';

export default function productreducer(state = [], action) {
  switch (action.type) {
    case PRODUCT_ACTION.SET_PRODUCT: {
      const newState = [...action.payload];
      return newState;
    }
    default:
      return state;
  }
}
