import { ESOthers } from "../core/eService_session";
import { Action } from "redux";
import { EServiceAction } from "../actions/eService_action";

const INITIAL_STATE : ESOthers = {
    esOthers : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function ESOthersReducer(
    state : ESOthers = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>
) : ESOthers{
        switch(action.type){
            case EServiceAction.ESERVICE_OTHERS_FETCH :
                return{
                    ...state,
                    esOthers : null,
                    loading : true,
                    error : ''
                }
            case EServiceAction.ESERVICE_OTHERS_FETCH_SUCCESS :
                return{
                    ...state,
                    esOthers : action.payload,
                    loading : false,
                    error : ''
                }
            case EServiceAction.ESERVICE_OTHERS_FETCH_ERROR :
                return{
                    ...state,
                    esOthers : null,
                    loading : false,
                    error : action.error
                }
        }
    return state;
}