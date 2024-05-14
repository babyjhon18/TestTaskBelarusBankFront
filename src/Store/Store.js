import { categoryReduser } from "../Redux/CategoryReduser";
import { productReduser } from "../Redux/ProductReduser";
import { userReduser } from "../Redux/UserAccountReduser";
import { combineReducers, createStore } from "redux";

const rootReduser = combineReducers({
    userReduser: userReduser,
    productReduser: productReduser,
    categoryReduser: categoryReduser,
})

export const store = createStore(rootReduser);

