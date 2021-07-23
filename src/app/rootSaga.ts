import authSaga from 'features/auth/authSaga'
import { LoginPayload } from 'features/auth/authSlice'
import citySaga from 'features/city/citySaga'
import dashboardSaga from 'features/dashboard/dashboardSaga'
import studentSaga from 'features/students/studentSaga'
import {all} from 'redux-saga/effects'

export default function* rootSaga() {
    yield all([
        authSaga(),
        dashboardSaga(),
        studentSaga(),
        citySaga()
    ])
}