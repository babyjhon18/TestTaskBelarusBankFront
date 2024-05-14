import { CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT, VIEW_PRODUCT } from "../../Store/Constants"

export function ViewProducts(){
    return {
        type: VIEW_PRODUCT,
    }
}

export function CreateProducts(){
    return {
        type: CREATE_PRODUCT,
    }
}

export function UpdateProducts(){
    return {
        type: UPDATE_PRODUCT,
    }
}

export function DeleteProducts(){
    return {
        type: DELETE_PRODUCT,
    }
}