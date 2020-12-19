import {
  GET_JOB_LIST,
  GET_JOB_LIST_SUCCESS,
  GET_JOB_LIST_FAILED,
  GET_JOB_LIST_PAGINATION,
  GET_JOB_LIST_PAGINATION_SUCCESS,
  CANT_GET_ANY_DATA,
} from '../constants';

const INITIAL_STATE = {
  jobList: [],
  isFetchingWithPaging: false,
  isFetching: false,
  error: false,
  cantGetAnyData: false,
};

const getJobListReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_JOB_LIST:
      return {...state, isFetching: true, cantGetAnyData: false};

    case GET_JOB_LIST_PAGINATION:
      return {...state, isFetchingWithPaging: true, cantGetAnyData: false};

    case GET_JOB_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        jobList: action.payload,
      };

    case GET_JOB_LIST_FAILED:
      return {...state, isFetching: false, isFetchingWithPaging: false, error: action.payload};

    case GET_JOB_LIST_PAGINATION_SUCCESS:
      return {
        ...state,
        isFetchingWithPaging: false,
        jobList: state.jobList.concat(action.payload),
      };

    case CANT_GET_ANY_DATA:
      return {...state, cantGetAnyData: true, isFetching: false, isFetchingWithPaging: false};

    default:
      return state;
  }
};

export default getJobListReducers;
