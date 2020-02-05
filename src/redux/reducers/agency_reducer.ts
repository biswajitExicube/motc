import { AgenctData } from "../core/agencyData";
import { Action } from "redux";
import { AgencyAction } from "../actions/agenct_action";

const INITIAL_STATE : AgenctData = {
    agencyData : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionPayloadWith<T,E> extends Action{
    payload? : T,
    error? : E
}

export function AgencyReducer(
    state : AgenctData = INITIAL_STATE,
    action: ActionPayloadWith<Payload,Error>) : 
    AgenctData{
        switch(action.type){
            case AgencyAction.AGENCY_FETCH :
                return{
                    ...state,
                    agencyData : null,
                    loading : true,
                    error : ''
                }
            case AgencyAction.AGENCY_FETCH_SUCCESS :
                return{
                    ...state,
                    agencyData : action.payload,
                    loading : false,
                    error : ''
                }
            case AgencyAction.AGENCY_FETCH_ERROR :
                return{
                    ...state,
                    agencyData : null,
                    loading : false,
                    error : action.error
                }
        }
        return state;
    }