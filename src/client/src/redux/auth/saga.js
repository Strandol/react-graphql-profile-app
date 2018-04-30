import { call, all, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_USER_DATA,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR
} from "./constants";
import errMessages from "../../config/errorMessages";
import { clearToken } from "../../utils";
import { getUserData } from "../../api/auth";

function* userData() {
  yield takeEvery(GET_USER_DATA, function*(action) {
    try {
      const answer = yield call(getUserData);

      yield put({
        type: GET_USER_DATA_SUCCESS,
        payload: answer
      });
    } catch ({ response }) {
      console.log('====================================');
      console.log(response);
      console.log('====================================');
      clearToken();

      yield put({
        type: GET_USER_DATA_ERROR,
        payload: errMessages[response.status]
      });
    }
  });
}

export default function* rootSaga() {
  yield all([fork(userData)]);
}
