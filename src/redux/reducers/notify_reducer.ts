import { NotifyData } from "../core/notify_session";
import { Action } from "redux";
import { NotifyAction } from "../actions/notify_action";

const INITIAL_STATE : NotifyData = {
    notifyData : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function NotifyReducer(
    state : NotifyData = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>
) : NotifyData{
        switch(action.type){
            case NotifyAction.NOTIFY_FETCH :
                return{
                    ...state,
                    notifyData : null,
                    loading : true,
                    error : ''
                }
            case NotifyAction.NOTIFY_FETCH_SUCCESS :
                return{
                    ...state,
                    notifyData : action.payload,
                    loading : false,
                    error : ''
                }
            case NotifyAction.NOTIFY_FETCH_ERROR :
                return{
                    ...state,
                    notifyData : null,
                    loading : false,
                    error : action.error
                }
        }
    return state;
}