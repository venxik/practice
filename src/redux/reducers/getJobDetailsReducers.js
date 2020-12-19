const {
  GET_JOB_DETAIL,
  GET_JOB_DETAIL_SUCCESS,
  GET_JOB_DETAIL_FAILED,
} = require('../constants');

const INITIAL_STATE = {
  isFetching: false,
  error: false,
  jobDetails: [],
};

const jobDetailsReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_JOB_DETAIL:
      return {...state, isFetching: true};
    case GET_JOB_DETAIL_SUCCESS:
      return {...state, isFetching: false, jobDetails: action.payload};
    case GET_JOB_DETAIL_FAILED:
      return {...state, isFetching: false, error: action.payload};
    default:
      return state;
  }
};

export default jobDetailsReducers;
