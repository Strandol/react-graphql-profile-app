import { call, all, fork, put, takeEvery } from "redux-saga/effects";
import { GET_USER_DATA, GET_USER_DATA_SUCCESS } from "./constants";
import { setToken, getToken } from "../../utils";
import { getUserData } from "../../api/auth";

function* userData() {
  yield takeEvery(GET_USER_DATA, function*(action) {
    setToken(action.token);

    const answer = yield call(getUserData);

    yield put({
      type: GET_USER_DATA_SUCCESS,
      payload: answer
    });
  });
}

export default function* rootSaga() {
  yield all([fork(userData)]);
}
