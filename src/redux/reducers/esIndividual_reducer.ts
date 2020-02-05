import { ESIndividual } from "../core/eService_session";
import { Action } from "redux";
import { EServiceAction } from "../actions/eService_action";

const INITIAL_STATE : ESIndividual = {
    esIndividual : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function ESIndividualReducer(
    state : ESIndividual = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>
) : ESIndividual{
        switch(action.type){
            case EServiceAction.ESERVICE_INDIVIDUAL_FETCH :
                return{
                    ...state,
                    esIndividual : null,
                    loading : true,
                    error : ''
                }
            case EServiceAction.ESERVICE_INDIVIDUAL_FETCH_SUCCESS :
                return{
                    ...state,
                    esIndividual : action.payload,
                    loading : false,
                    error : ''
                }
            case EServiceAction.ESERVICE_INDIVIDUAL_FETCH_ERROR :
                return{
                    ...state,
                    esIndividual : null,
                    loading : false,
                    error : action.error
                }
        }
    return state;
}