import {CATEGORY_ACTION} from '../../types';
import store from '../../../store';

const {dispatch} = store;

export const SET_CATEGORY = payload => {
  dispatch({
    type: CATEGORY_ACTION.SET_CATEGORY,
    payload,
  });
};
