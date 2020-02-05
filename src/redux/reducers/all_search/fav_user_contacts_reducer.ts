
import { Action } from "redux";
// import { AboutAction } from "../../actions/about_action";
import { AllSearchAction } from "../../actions/all_search_action";
import { SearchFavUserContacts } from "../../core/all_search_session";

const INITIAL_STATE : SearchFavUserContacts = {
    SearchFavUserContacts : null,
    loading : false,
    error : ''
}
type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function FavUsercontactSearchReducer(
    state : SearchFavUserContacts = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) :
    SearchFavUserContacts{
        switch(action.type){
            case AllSearchAction.FETCH_FAVOURITE_USER_CONTACT:
                return{
                    ...state,
                    SearchFavUserContacts : null,
                    loading : true,
                    error : ''
                }
            case AllSearchAction.SUCCESS_FAVOURITE_USER_CONTACT:
            // console.log("working...... ")
                return {
                    ...state,
                    SearchFavUserContacts : action.payload,
                    loading : false,
                    error : ''
                }
        }
        return state;
    }