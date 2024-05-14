import { VIEW_CATEGORIES } from "../Store/Constants"

const categoriesState = {
    categories: []
} 

export function categoryReduser(state = categoriesState, action){
    switch(action.type){
        case VIEW_CATEGORIES:
            return{
                ...state,
                categories: {...action.payload},
            } 
        default:
            return {
                ...state
            }
    }
}