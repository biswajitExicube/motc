import { EServiceData } from "../core/eService_session";
import { Action } from "redux";
import { EServiceAction } from "../actions/eService_action";

const INITIAL_STATE : EServiceData = {
    eServiceData : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function EServiceReducer(
    state : EServiceData = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>
) : EServiceData{
        switch(action.type){
            case EServiceAction.ESERVICE_FETCH :
                return{
                    ...state,
                    eServiceData : null,
                    loading : true,
                    error : ''
                }
            case EServiceAction.ESERVICE_FETCH_SUCCESS :
                return{
                    ...state,
                    eServiceData : action.payload,
                    loading : false,
                    error : ''
                }
            case EServiceAction.ESERVICE_FETCH_ERROR :
                return{
                    ...state,
                    eServiceData : null,
                    loading : false,
                    error : action.error
                }
        }
    return state;
}