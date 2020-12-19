import {
  GET_JOB_LIST,
  GET_JOB_LIST_SUCCESS,
  GET_JOB_LIST_FAILED,
  GET_JOB_LIST_PAGINATION,
  GET_JOB_LIST_PAGINATION_SUCCESS,
  CANT_GET_ANY_DATA,
} from '../constants';
import {BASE_URL} from '../../Constants/GlobalConstants';
import axios from 'axios';

const AxiosConfig = axios.create({
  timeout: 5000,
});

const fetchJobList = (description, fulltime, location, page) => {
  return async (dispatch) => {
    if (page < 2) dispatch(getJobList());
    else dispatch(getJobListPagination());
    try {
      var loc = location.split(' ').join('+');
      var desc = description.split(' ').join('+');
      var URL = `${BASE_URL}.json?page=${page}&description=${desc}&location=${loc}&full_time=${fulltime}`;
      
      await AxiosConfig.get(URL)
        .then((res) => {
          console.log('response', res);
          if (res.data.length < 1) {
            dispatch(cantGetAnyData());
            console.log("can't get any data");
          } else {
            if (page < 2) {
              dispatch(getjobListSuccess(res.data));
              console.log('without pagination');
            } else {
              console.log('with pagination');
              dispatch(getJobListPaginationSuccess(res.data));
            }
          }
          return Promise.resolve();
        })
        .catch((error) => {
          dispatch(getJobListFailed());
          console.log(error);
          return Promise.reject();
        });
    } catch {
      dispatch(getJobListFailed());
      return Promise.reject();
    }
  };
};

const getJobList = () => {
  return {
    type: GET_JOB_LIST,
  };
};

const getJobListPagination = () => {
  return {
    type: GET_JOB_LIST_PAGINATION,
  };
};

const getjobListSuccess = (data) => {
  return {
    type: GET_JOB_LIST_SUCCESS,
    payload: data,
  };
};

const getJobListPaginationSuccess = (data) => {
  return {
    type: GET_JOB_LIST_PAGINATION_SUCCESS,
    payload: data,
  };
};

const getJobListFailed = (data) => {
  return {
    type: GET_JOB_LIST_FAILED,
    payload: data,
  };
};

const cantGetAnyData = () => {
  return {
    type: CANT_GET_ANY_DATA,
  };
};

export {fetchJobList};
