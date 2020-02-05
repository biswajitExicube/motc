
import { Action } from "redux";
// import { AboutAction } from "../../actions/about_action";
import { SearchAgencies } from "../../core/all_search_session";
import { AllSearchAction } from "../../actions/all_search_action";

const INITIAL_STATE : SearchAgencies = {
    SearchAgenciesData : null,
    loading : false,
    error : ''
    
}
type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function AgenciesSearchReducer(
    state : SearchAgencies = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) :
    SearchAgencies{
        switch(action.type){
            case AllSearchAction.FETCH_AGENCIES:
                return{
                    ...state,
                    SearchAgenciesData : null,
                    loading : true,
                    error : ''
                }
            case AllSearchAction.SUCCESS_AGENCIES:
                return {
                    ...state,
                    SearchAgenciesData : action.payload,
                    loading : false,
                    error : ''
                }
            // case AboutAction.ABOUT_FETCH_ERROR:
            //     return{
            //         ...state,
            //         SearchAgenciesData : null,
            //         loading : false,
            //         error : action.error
            //     }
        }
        return state;
    }
