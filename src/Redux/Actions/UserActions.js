import { SET_USER, VIEW_USER, VIEW_USERS } from "../../Store/Constants";

export function SetUserState(){
    return {
        type: SET_USER,
    }
}

export function ViewUser(){
    return {
        type: VIEW_USER,
    }
}

export function ViewUsers(){
    return {
        type: VIEW_USERS,
    }
}

