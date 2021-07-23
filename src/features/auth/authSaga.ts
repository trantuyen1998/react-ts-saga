import { PayloadAction } from '@reduxjs/toolkit';
import { fork, take, call, delay, put } from 'redux-saga/effects'
import { authActions, LoginPayload } from "./authSlice";
import { push } from 'connected-react-router'



function* handleLogin(payload: LoginPayload){
    try {
        yield delay(1000) // fake call api
        localStorage.setItem('access_token', 'fake_token')
        yield put(authActions.loginSuccess({
            id: 1,
            name: 'tuyen tran'
        }))

        yield put(push('/admin/dashboard'))
    } catch (e) {
        yield put(authActions.loginFailed(e.message))
    }
}

function* handleLogout(){
    yield delay(500)
    localStorage.removeItem('access_token')
    yield put(push('/login'))
}

function* watchLoginFlow() {
    while(true){

        const isLoggedIn = Boolean(localStorage.getItem('access_token'))
        if(!isLoggedIn){
            const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
            yield fork(handleLogin, action.payload)
        }
    
        yield take(authActions.logout.type)
        yield call(handleLogout)
    }
}


export default function* authSaga () {
    yield fork(watchLoginFlow)
}