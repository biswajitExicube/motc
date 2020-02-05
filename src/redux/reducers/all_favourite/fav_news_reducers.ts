
import { Action } from "redux";
import { AllFavouriteAction } from "../../actions/all_favourite_action";
import { FavNews } from "../../core/all_favourite_session";


const INITIAL_STATE : FavNews = {
    favouriteNews : null,
    loading : false,
    error : ''
}
type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function FavNewsReducer(
    state : FavNews = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) :
    FavNews{
        switch(action.type){
            case AllFavouriteAction.FETCH_FAV_NEWS:
                return{
                    ...state,
                    favouriteNews : null,
                    loading : true,
                    error : ''
                }
            case AllFavouriteAction.SUCCESS_FAV_NEWS:
                return {
                    ...state,
                    favouriteNews : action.payload,
                    loading : false,
                    error : ''
                }
        }
        return state;
    }
