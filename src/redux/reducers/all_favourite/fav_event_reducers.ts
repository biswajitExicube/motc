
import { Action } from "redux";
import { AllFavouriteAction } from "../../actions/all_favourite_action";
import { FavEvents } from "../../core/all_favourite_session";


const INITIAL_STATE : FavEvents = {
    favouriteEvents : null,
    loading : false,
    error : ''
}
type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function FavEventReducer(
    state : FavEvents = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) :
    FavEvents{
        switch(action.type){
            case AllFavouriteAction.FETCH_FAV_EVENTS:
                return{
                    ...state,
                    favouriteEvents : null,
                    loading : true,
                    error : ''
                }
            case AllFavouriteAction.SUCCESS_FAV_EVENTS:
                return {
                    ...state,
                    favouriteEvents : action.payload,
                    loading : false,
                    error : ''
                }
        }
        return state;
    }
