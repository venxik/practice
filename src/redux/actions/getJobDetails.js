import {
  GET_JOB_DETAIL,
  GET_JOB_DETAIL_FAILED,
  GET_JOB_DETAIL_SUCCESS,
} from '../constants';
import {BASE_URL} from '../../Constants/GlobalConstants';
import axios from 'axios';

const AxiosConfig = axios.create({
  timeout: 5000,
});

const fetchJobDetails = (id) => {
  return async (dispatch) => {
    dispatch(getJobDetails());
    try {
      await AxiosConfig.get(`${BASE_URL}/${id}.json`)
        .then((res) => {
          dispatch(getJobDetailSuccess(res.data));
          return Promise.resolve();
        })
        .catch((err) => {
          getJobDetailFailed(err);
          return Promise.reject();
        });
    } catch {
      dispatch(getJobListFailed(err));
      return Promise.reject();
    }
  };
};

const getJobDetails = () => {
  return {
    type: GET_JOB_DETAIL,
  };
};

const getJobDetailSuccess = (data) => {
  return {
    type: GET_JOB_DETAIL_SUCCESS,
    payload: data,
  };
};

const getJobDetailFailed = (data) => {
  return {
    type: GET_JOB_DETAIL_FAILED,
    payload: data,
  };
};

export {fetchJobDetails};
