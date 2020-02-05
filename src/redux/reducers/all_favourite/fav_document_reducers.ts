
import { Action } from "redux";
import { FavDocuments } from "../../core/all_favourite_session";
import { AllFavouriteAction } from "../../actions/all_favourite_action";


const INITIAL_STATE : FavDocuments = {
    favouriteDocuments : null,
    loading : false,
    error : ''
}
type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function FavDocumentReducer(
    state : FavDocuments = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) :
    FavDocuments{
        switch(action.type){
            case AllFavouriteAction.FETCH_FAV_DOCUMENT:
                return{
                    ...state,
                    favouriteDocuments : null,
                    loading : true,
                    error : ''
                }
            case AllFavouriteAction.SUCCESS_FAV_DOCUMENT:
                return {
                    ...state,
                    favouriteDocuments : action.payload,
                    loading : false,
                    error : ''
                }
        }
        return state;
    }

