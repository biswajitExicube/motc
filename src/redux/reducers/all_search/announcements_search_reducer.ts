
import { Action } from "redux";
import { SearchAnnouncements } from "../../core/all_search_session";
import { AllSearchAction } from "../../actions/all_search_action";

const INITIAL_STATE : SearchAnnouncements = {
    SearchAnnouncementsData : null,
    loading : false,
    error : ''
}
type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function AnnouncementSearchReducer(
    state : SearchAnnouncements = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) :
    SearchAnnouncements{
        switch(action.type){
            case AllSearchAction.FETCH_ANNOUNCEMENT:
                return{
                    ...state,
                    SearchAnnouncementsData : null,
                    loading : true,
                    error : ''
                }
            case AllSearchAction.SUCCESS_ANNOUNCEMENT:
                return {
                    ...state,
                    SearchAnnouncementsData : action.payload,
                    loading : false,
                    error : ''
                }
            // case AboutAction.ABOUT_FETCH_ERROR:
            //     return{
            //         ...state,
            //         SearchAnnouncementsData : null,
            //         loading : false,
            //         error : action.error
            //     }
        }
        return state;
    }