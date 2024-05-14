//Server link
export const SERVER_LINK = "http://localhost:7244/api";
//Links
export const LOGIN_LINK = "/Login";
export const PRODUCT_LINK = "/Product";
export const CATEGORY_LINK = "/Category";
export const USER_LINK = "/Users";
export const NBRB_LINK = "https://api.nbrb.by/exrates/rates/431"
//Actions
//User actions
export const SET_USER = "SET_USER";
export const VIEW_USER = "VIEW_USER";
export const VIEW_USERS = "VIEW_USERS";
export const CREATE_USER = "CREATE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";
//Category actions
export const VIEW_CATEGORIES = "VIEW_CATEGORIES";
export const CREATE_CATEGORIES = "CREATE_CATEGORIES";
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
export const DELETE_CATEGORIES = "DELETE_CATEGORIES";
//Product actions
export const VIEW_PRODUCT = "VIEW_PRODUCT";
export const SORT_PRODUCT = "SORT_PRODUCT";
export const SEARCH_PRODUCT = "SEARCH_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
//Header constants
export const jsonHeaderIsAdmin = {
    id:1,
    productName:"Наименование продукта",
    fK_Category:"Категория",
    productDescription:"Описание",
    productPrice:"Стоиомсть в рублях",
    generalNote:"Примечание общее",
    specialNote:"Примечание специальное",
  }
//Other Constans
export const customConfig = {
    headers: {
    'Content-Type': 'application/json'
    }
};