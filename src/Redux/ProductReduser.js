import { SEARCH_PRODUCT, VIEW_PRODUCT } from "../Store/Constants"

const productState = {
    products: [],
    categories: [],
    searchedProducts: [],
    currentProductRate: {}
} 

export function productReduser(state = productState, action){
    switch(action.type){
        case VIEW_PRODUCT:
            return { 
                ...state,
                products: action.payload.products.products,
                categories: action.payload.products.categories,
                searchedProducts: action.payload.products.products,
                currentProductRate: action.payload.currency
            }
        case SEARCH_PRODUCT:
            switch(action.index){ 
                case 0:
                    var searchedProducts = Object.values(state.products).filter((element) => {
                        let finalRes = element.productName.toLowerCase();
                        return finalRes.indexOf(action.keyword.toLowerCase()) !== -1
                    });
                    break;
                case 1: 
                    var finalResult = state.categories.filter(category => {
                        let finalRes = category.categoryName.toLowerCase(); 
                        return finalRes.indexOf(action.keyword.toLowerCase()) !== -1;
                    });
                    console.log(finalResult);
                    var searchedProducts = state.products.filter((element) => {
                        console.log(element);
                        return finalResult.some((f) => {
                            return f.categoryId == element.fK_Category;
                        });
                    });
                    break;
            }
            return {
                ...state,
                searchedProducts: searchedProducts,
            }
        default:
            return {
                ...state
            }
    }
}