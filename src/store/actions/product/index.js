import {PRODUCT_ACTION} from '../../types';
import store from '../../../store';

const {dispatch} = store;

export const SET_PRODUCT = payload => {
  dispatch({
    type: PRODUCT_ACTION.SET_PRODUCT,
    payload,
  });
};
