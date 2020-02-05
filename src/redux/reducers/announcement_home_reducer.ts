import { HomeAnnouncement } from "../core/announce_session";
import { Action } from "redux";
import { AnnounceAction } from "../actions/announce_action";

const INITIAL_STATE : HomeAnnouncement = {
    homeAnnouncement : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function AnnouncementHome(
    state : HomeAnnouncement = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) : 
    HomeAnnouncement{
        switch(action.type){
            case AnnounceAction.FETCH_HOME_ANNOUNCEMENT :
                return{
                    ...state,
                    homeAnnouncement : null,
                    loading : true,
                    error : ''
                }
            case AnnounceAction.SUCCESS_HOME_ANNOUNCEMENT :
                return{
                    ...state,
                    homeAnnouncement : action.payload,
                    loading : false,
                    error : ''
                }
            case AnnounceAction.FAILED_HOME_ANNOUNCEMENT :
                return{
                    ...state,
                    homeAnnouncement : null,
                    loading : false,
                    error : action.error
                }
        }
        return state;
    }