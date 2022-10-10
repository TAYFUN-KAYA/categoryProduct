import {createStore} from 'redux';
import reducers from './reducers';

const STORE = createStore(reducers, {
  category: [
    {id: 1, name: 'Category 1', product: []},
    {id: 2, name: 'Category 2', product: []},
  ],
  product: [
    {id: 1, name: 'tayfun', checked: true},
    {id: 2, name: 'tayfun2', checked: false},
  ],
});

export default STORE;
