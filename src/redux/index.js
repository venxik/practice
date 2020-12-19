import {combineReducers} from 'redux';
import getJobListReducers from "./reducers/getJobListReducers";
import getJobDetailsReducers from "./reducers/getJobDetailsReducers";

const RootReducers = combineReducers({
  getJobListReducers: getJobListReducers,
  getJobDetailsReducers: getJobDetailsReducers
});
export default RootReducers;