import { combineReducers } from 'redux';
import user from './user';
import query from './query';

const reducer = combineReducers({
  user,
  query,
});

export default reducer;
