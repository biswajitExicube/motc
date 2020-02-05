
import { Action } from "redux";
// import { AboutAction } from "../../actions/about_action";
import { SearchUserContacts } from "../../core/all_search_session";
import { AllSearchAction } from "../../actions/all_search_action";

const INITIAL_STATE : SearchUserContacts = {
    SearchUserContactsData : null,
    loading : false,
    error : ''
}
type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function UsercontectSearchReducer(
    state : SearchUserContacts = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) :
    SearchUserContacts{
        switch(action.type){
            case AllSearchAction.FETCH_USER_CONTACT:
                return{
                    ...state,
                    SearchUserContactsData : null,
                    loading : true,
                    error : ''
                }
            case AllSearchAction.SUCCESS_USER_CONTACT:
                return {
                    ...state,
                    SearchUserContactsData : action.payload,
                    loading : false,
                    error : ''
                }
            // case AboutAction.ABOUT_FETCH_ERROR:
            //     return{
            //         ...state,
            //         SearchEventsData : null,
            //         loading : false,
            //         error : action.error
            //     }
        }
        return state;
    }