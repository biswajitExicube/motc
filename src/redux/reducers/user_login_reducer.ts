import { AboutData } from "../core/about_session";
import { Action } from "redux";
import { UserloginData } from "../core/user_login_session";
import { UserloginAction } from "../actions/user_login_action";

const INITIAL_STATE : UserloginData = {
    userdata : null,
    loading : false,
    error   : ""
}
type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function UserLoginReducer(
    state : UserloginData = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) :
    UserloginData{
        switch(action.type){
            case UserloginAction.START_LOGIN:
                return{
                    ...state,
                    userdata  : null,
                    loading   : true,
                    error     : ''
                }
            case UserloginAction.LOGIN_SUCCESS:
                return {
                    ...state,
                    userdata  : action.payload,
                    loading   : false,
                    error     : ''
                }
            case UserloginAction.LOGIN_FAILED:
                return{
                    ...state,
                    userdata  : null,
                    loading   : false,
                    error     : action.error
                }
        }
        return state;
    }
