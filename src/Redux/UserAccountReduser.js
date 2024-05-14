import { SET_USER, VIEW_USER, VIEW_USERS } from "../Store/Constants"

const userState = {
    userName: "",
    userAccessToken: "",
    userRole: -1,
    claims: [],
    IsAdmin: false,
    users: []
} 

export function userReduser(state = userState, action){
    switch(action.type){
        case SET_USER:
            return{
                ...state,
                userName: action.payload.userName,
                userAccessToken: action.payload.userAccessToken,
                userRole: action.payload.userRole,
                claims: action.payload.claims,
                IsAdmin: action.payload.IsAdmin
            } 
        case VIEW_USER:
            return{
                ...state,
                userName: action.payload.userName,
                userRole: action.payload.userRole,
                IsAdmin: action.payload.IsAdmin
            }
        case VIEW_USERS:
            return{
                ...state,
                users: action.payload,
            }
        default:
            return {
                ...state
            }
    }
}