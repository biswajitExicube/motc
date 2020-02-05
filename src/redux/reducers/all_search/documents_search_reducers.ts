
import { Action } from "redux";
import { SearchDocuments } from "../../core/all_search_session";
import { AllSearchAction } from "../../actions/all_search_action";

const INITIAL_STATE : SearchDocuments = {
    SearchDocumentsData : null,
    loading : false,
    error : ''
}
type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function DocumentSearchReducer(
    state : SearchDocuments = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) :
    SearchDocuments{
        switch(action.type){
            case AllSearchAction.FETCH_DOCUMENT:
                return{
                    ...state,
                    SearchDocumentsData : null,
                    loading : true,
                    error : ''
                }
            case AllSearchAction.SUCCESS_DOCUMENT:
                return {
                    ...state,
                    SearchDocumentsData : action.payload,
                    loading : false,
                    error : ''
                }
            // case AboutAction.ABOUT_FETCH_ERROR:
            //     return{
            //         ...state,
            //         SearchDocumentsData : null,
            //         loading : false,
            //         error : action.error
            //     }
        }
        return state;
    }