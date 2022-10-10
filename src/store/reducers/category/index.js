import {CATEGORY_ACTION} from '../../types';

export default function categoryreducers(state = [], action) {
  switch (action.type) {
    case CATEGORY_ACTION.SET_CATEGORY: {
      let newState = action.payload;
      return newState;
    }
    default:
      return state;
  }
}
