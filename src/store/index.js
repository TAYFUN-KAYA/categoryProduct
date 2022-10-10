import {createStore} from 'redux';
import reducers from './reducers';

const STORE = createStore(reducers, {
  category: [
    {id: 1, name: 'Category 1', product: []},
    {id: 2, name: 'Category 2', product: []},
  ],
  product: [
    {id: 1, name: 'product 1', checked: true},
    {id: 2, name: 'product 2', checked: false},
    {id: 3, name: 'product 3', checked: false},
    {id: 4, name: 'product 4', checked: false},
    {id: 5, name: 'product 5', checked: false},
  ],
});

export default STORE;
