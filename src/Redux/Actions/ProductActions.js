import { CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT, VIEW_PRODUCT } from "../../Store/Constants";

export function ViewProducts(products, currency){
    return {
        type: VIEW_PRODUCT,
        products: products,
        currency: currency
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

