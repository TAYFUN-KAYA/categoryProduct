import {combineReducers} from 'redux';
import reduceReducers from 'reduce-reducers';
import product from './product';
import category from './category';

export default reduceReducers(
  combineReducers({
    product,
    category,
  }),
);
