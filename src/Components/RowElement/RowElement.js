import { useEffect, useState } from 'react';
import '../RowElement/RowElement.css';
import { FaChevronDown } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import UpdateProduct from '../ProductComponent/UpdateProduct';
import { PRODUCT_LINK, SERVER_LINK } from '../../Store/Constants';
import axios from 'axios';
import DeleteProduct from '../ProductComponent/DeleteProduct';
import { GiRoundStar } from "react-icons/gi";

function RowElement(props){
    
    const [categoryName, setSetCategory] = useState();
    const [productPriceUSD, setProductPriceUSD] = useState();
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const product = useSelector(state => state.productReduser);
    const user = useSelector(state => state.userReduser);
    const access_token = localStorage.getItem('access_token');
    const [open, setOpen] = useState(false);
    const [openModalTitle, setOpenModalTitle] = useState(false);

    const openUpdateModal = () => {
        setIsUpdateModalOpen(true);
    };
    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
    };

    const updateProduct = () => {
        openUpdateModal()
    }

    const deleteProduct = () => {
        openDeleteModal()
    }

    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleMouseOverTitle = () => {
        setOpenModalTitle(true)
    }

    const handleMouseLeaveTitle = () => {
        setOpenModalTitle(false)
    }

    const handleRetrieveDataUpdate = (data) => {
        let body = {
            "productId": data.productId,
            "productName": data.productName,
            "fK_Category": data.productCategory,
            "productDescription": data.productDescription,
            "productPrice": data.productPrice,
            "generalNote": data.productGeneralDescription,
            "specialNote": data.productSpecialDescription,
          }
          axios.put(SERVER_LINK + PRODUCT_LINK + "?ProductId=" + data.productId, body, { 
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': 'application/json'
            }})
          .then(function (response) {
            console.log(response);
            window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
    };

    const handleRetrieveDataDelete = (data) => {
          axios.delete(SERVER_LINK + PRODUCT_LINK + "?ProductId=" + data.productId, { 
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': 'application/json'
            }})
          .then(function (response) {
            console.log(response);
            window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
    };

    useEffect(() =>{
        product.categories.find(element => { 
            if(element.categoryId == props.products.fK_Category){
                setSetCategory(element.categoryName);
            }  
        });
        let productPrice = props.products.productPrice;
        let officialRate = props.currentProductRate.Cur_OfficialRate;
        setProductPriceUSD((productPrice/officialRate).toFixed(2) + ' USD')
    }, [product])

    return (
    <div style={{padding: "0px"}}>
        <UpdateProduct product={props.products} categories={props.categories} isOpen={isUpdateModalOpen} onClose={closeUpdateModal} onRetrieveData={handleRetrieveDataUpdate}></UpdateProduct>
        <DeleteProduct product={props.products} isOpen={isDeleteModalOpen} onClose={closeDeleteModal} onRetrieveData={handleRetrieveDataDelete}></DeleteProduct>
        <div style={{padding: "0px"}} className="col-md-12 col-sm-12 col-lg-12 col-xs-12 col-xl-12 rowElement">
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "45px", maxWidth: "45px"}}>
                <div>
                    <button id='buttonSettings' onClick={handleOpen} className='btn'><FaChevronDown style={{marginTop: "-5px"}} /></button>
                    {open ? (
                        <ul className="menu">
                            <li className="menu-item">
                                <button onClick={updateProduct}>Редактировать</button>
                            </li>
                            {
                                user.userRole != 1 ?
                                <li className="menu-item">
                                    <button onClick={deleteProduct}>Удалить</button>
                                </li> : ""
                            }
                        </ul>
                    ) : null}
                </div>
            </div>
            <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "80px", maxWidth: "300px"}}>
                {props.products.productName}
            </div>
            <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "80px", maxWidth: "200px"}}>
                {categoryName}
            </div>
            <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "80px", maxWidth: "300px"}}>
                {props.products.productDescription}
            </div>
            <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2"  style={{minWidth: "80px", maxWidth: "200px"}}>
                    {props.products.productPrice} <GiRoundStar style={{color: 'gray', marginTop: '-4px'}} onMouseOver={handleMouseOverTitle} onMouseLeave={handleMouseLeaveTitle} /> 
                    { 
                        openModalTitle ? (
                            <div className="menu">{productPriceUSD}</div>
                        ) : null
                    }
            </div>
            <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "80px", maxWidth: "300px"}}>
                {props.products.generalNote}
            </div>
            {
                user.userRole != 1 ? 
                    <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "80px", maxWidth: "300px"}}>{props.products.specialNote}</div> :
                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "80px", maxWidth: "300px"}}></div>
            }
            
        </div>
    </div>
    )
}

export default RowElement;