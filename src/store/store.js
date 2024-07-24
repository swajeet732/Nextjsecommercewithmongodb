// src/store/store.js
import { createStore } from 'redux';
import rootReducer from '../redux/reducers'; // Adjust path as needed

const store = createStore(rootReducer);

export default store;
