import { useDispatch, useSelector } from 'react-redux';
import '../Catalog/Catalog.css';
import 'bootstrap/dist/css/bootstrap.css';
import { NBRB_LINK, PRODUCT_LINK, SERVER_LINK, VIEW_PRODUCT, jsonHeaderIsAdmin } from '../../Store/Constants';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RowElement from '../RowElement/RowElement';
import RowHeader from '../RowHeader/RowHeader';
import SearchBar from '../SearchBar/SearchBar';

function Catalog(){

    const dispatch = useDispatch();
    const [firstStart, setFirstStart] = useState(true);
    const products = useSelector(state => state.productReduser);
    //const user = useSelector(state => state.userReduser);
    const access_token = localStorage.getItem('access_token');

    function getCurrentRates(responseData){
        axios.get(NBRB_LINK, { })
        .then((response) => {
            dispatch({type: VIEW_PRODUCT, payload: { products: responseData, currency: response.data }});
        })
        .catch((error) => console.log(error));
    }

    function getProducts(){
        if(firstStart){
            setFirstStart(false);
        };
        axios.get(SERVER_LINK + PRODUCT_LINK, { 
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': 'application/json'
        }})
        .then((response) => {
            getCurrentRates(response.data);
        })
        .catch((error) => console.log(error));
    }

    useEffect(() => {
        if (firstStart) {
            getProducts();
        }      
    }, [products])

    return(
        <div>
        <SearchBar categories={products.categories}></SearchBar>
        <div className='mainBody'>
            <div className='row'style={{position: "sticky", top: "0px"}}>
                <RowHeader products={jsonHeaderIsAdmin}></RowHeader>
            </div>  
            {products.products && Object.values(products.searchedProducts).map((product, index) =>
                (
                    <div className='row'>
                        <RowElement currentProductRate={products.currentProductRate} key={index} products={product} categories={products.categories}></RowElement>
                    </div>
                )
            )}
        </div>
    </div>
    )
}

export default Catalog;