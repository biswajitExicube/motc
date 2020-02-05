import { ESCompanies } from "../core/eService_session";
import { Action } from "redux";
import { EServiceAction } from "../actions/eService_action";

const INITIAL_STATE : ESCompanies = {
    esCompanies : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function ESCompaniesReducer(
    state : ESCompanies = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>
) : ESCompanies{
        switch(action.type){
            case EServiceAction.ESERVICE_COMPANIES_FETCH :
                return{
                    ...state,
                    esCompanies : null,
                    loading : true,
                    error : ''
                }
            case EServiceAction.ESERVICE_COMPANIES_FETCH_SUCCESS :
                return{
                    ...state,
                    esCompanies : action.payload,
                    loading : false,
                    error : ''
                }
            case EServiceAction.ESERVICE_COMPANIES_FETCH_ERROR :
                return{
                    ...state,
                    esCompanies : null,
                    loading : false,
                    error : action.error
                }
        }
    return state;
}