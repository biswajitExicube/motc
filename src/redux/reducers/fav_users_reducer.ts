import { FavUsersData } from "../core/fav_user_session";
import { Action } from "redux";
import { FavUsersAction } from "../actions/fav_users_action";

const INITIAL_STATE : FavUsersData = {
    favUserData : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function FavUsersReducer(
    state : FavUsersData = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>
) : 
FavUsersData{
    switch(action.type){
        case FavUsersAction.FAV_USERS_FETCH :
            return{
                ...state,
                favUserData : null,
                loading : true,
                error : ''
            }
        case FavUsersAction.FAV_USERS_FETCH_SUCCESS :
            return{
                ...state,
                favUserData : action.payload,
                loading : false,
                error : ''
            }
        case FavUsersAction.FAV_USERS_FETCH_ERROR :
            return{
                ...state,
                favUserData : null,
                loading : false,
                error : action.error
            }
    }
    return state;
}