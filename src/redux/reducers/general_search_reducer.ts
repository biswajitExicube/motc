
import { Action } from "redux";
import { GeneralSearchData } from "../core/general_search_session";
import { GeneralSearchsAction } from "../actions/general_search_action";

const INITIAL_STATE : GeneralSearchData = {
    generalData : null,
    loading : false,
    error : ''
}
type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function GeneralSearchReducer(
    state : GeneralSearchData = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) :
    GeneralSearchData{
        switch(action.type){
            case GeneralSearchsAction.START_GENERAL_SEARCH:
                return{
                    ...state,
                    generalData : null,
                    loading : true,
                    error : ''
                }
            case GeneralSearchsAction.SUCCESS_GENERAL_SEARCH:
                return {
                    ...state,
                    generalData : action.payload,
                    loading : false,
                    error : ''
                }
            case GeneralSearchsAction.FAILED_GENERAL_SEARCH:
                return{
                    ...state,
                    generalData : null,
                    loading : false,
                    error : action.error
                }
        }
        return state;
    }
