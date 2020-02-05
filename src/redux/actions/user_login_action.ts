import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";
import { UserloginData } from "../core/user_login_session";

@Injectable()
export class UserloginAction{

    static START_LOGIN = 'START_LOGIN';
    static LOGIN_SUCCESS = 'LOGIN_SUCCESS';
    static LOGIN_FAILED = 'LOGIN_FAILED';

    constructor(private ngRedux : NgRedux<IAppState>){}
    
    startUserLogin(userLoginDetails:any){
        this.ngRedux.dispatch({
            type : UserloginAction.START_LOGIN,
            payload : userLoginDetails
        })
    }
    successUserLogin(payload : UserloginData){
        this.ngRedux.dispatch({
            type : UserloginAction.LOGIN_SUCCESS,
            payload : payload
        })
    }
    failedUserLogin(error){
        this.ngRedux.dispatch({
            type : UserloginAction.LOGIN_FAILED,
            error : error
        })
    }
}