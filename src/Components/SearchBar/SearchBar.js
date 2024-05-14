import { useState } from 'react';
import '../SearchBar/SearchBar.css'
import logo from '../../images/storeLogo.png'
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { CATEGORY_LINK, PRODUCT_LINK, SEARCH_PRODUCT, SERVER_LINK, USER_LINK, VIEW_USERS } from '../../Store/Constants';
import CreateNewProduct from '../ProductComponent/CreateNewProduct.js';
import axios from 'axios';
import ModifyCategories from '../CategoryComponent/ModifyCategories.js';
import ModifyUsers from '../UserComponent/ModifyUsers.js';

function SearchBar(props){

    const dispatch = useDispatch();
    const user = useSelector(state => state.userReduser)
    const [searchInputValue, setSearchInputValue] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [searchItemIndex, setSearchItemIndex] = useState(0);
    const [searchItemPlaceholder, setPlaceholder] = useState("Поиск по наименованию продукта...");
    const [margin, setMargin] = useState(localStorage.getItem("user_role"));
    
    const access_token = localStorage.getItem('access_token');

    const search = () => {
        dispatch({type: SEARCH_PRODUCT, keyword: searchInputValue, index: searchItemIndex}); 
    }

    const openModal = () => {
        setIsCreateModalOpen(true);
    };
    const closeModal = () => {
        setIsCreateModalOpen(false);
    };

    const openCategoriesModal = () => {
        setIsCategoryModalOpen(true);
    };
    const closeCategoriesModal = () => {
        setIsCategoryModalOpen(false);
    };

    const openUsersModal = () => {
        setIsUserModalOpen(true);
    };
    const closeUsersModal = () => {
        setIsUserModalOpen(false);
    };

    const exit = () => {
        localStorage.setItem("access_token", "");
        localStorage.setItem("user_id", "");
        localStorage.setItem("user_role", "");
        window.location.reload();
    }

    const newProduct = () => {
        openModal()
    }

    const handleRetrieveData = (data) => {
        let body = {
            "productName": data.productName,
            "fK_Category": data.productCategory,
            "productDescription": data.productDescription,
            "productPrice": data.productPrice,
            "generalNote": data.productGeneralDescription,
            "specialNote": data.productSpecialDescription,
          }
          axios.post(SERVER_LINK + PRODUCT_LINK, body, { 
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

    const handleRetrieveDataUsers = (data) => {
        if(data.actionType == "addUser"){
            let body = {
                "userName": data.userName,
                "userPassword": data.userPassword,
                "userRole": data.userRole,
                "isAdmin": data.isAdmin,
                "isBlocked": data.isBlocked
            }
            axios.post(SERVER_LINK + USER_LINK, body, { 
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
        }
        if(data.actionType == "updateUser"){
            let body = {
                "userId": data.userId,
                "userName": data.userName,
                "userPassword": data.userPassword,
                "userRole": data.userRole,
                "isAdmin": data.isAdmin,
                "isBlocked": data.isBlocked
            }
            console.log(body);
            axios.put(SERVER_LINK + USER_LINK + "?userId=" + data.userId, body, { 
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
        }
        if(data.actionType == "deleteUser"){
            console.log(data.userId);
            axios.delete(SERVER_LINK + USER_LINK + "?UserId=" + data.userId, { 
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
        }
    };

    const handleRetrieveDataCategories = (data) => {
        if(data.actionType == "addCategory"){
            let body = {
                "categoryName": data.categoryName,
            }
            axios.post(SERVER_LINK + CATEGORY_LINK, body, { 
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
        }
        if(data.actionType == "updateCategory"){
            let body = {
                "categoryId": data.categoryId,
                "categoryName": data.categoryName,
            }
            axios.put(SERVER_LINK + CATEGORY_LINK + "?categoryId=" + data.categoryId, body, { 
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
        }
        if(data.actionType == "deleteCategory"){
            console.log(data.categoryId);
            axios.delete(SERVER_LINK + CATEGORY_LINK + "?CategoryId=" + data.categoryId, { 
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
        }
    };

    const getUsersList = () => {
        axios.get(SERVER_LINK + USER_LINK, { 
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': 'application/json'
            }})
          .then(function (response) {
            dispatch({type: VIEW_USERS, payload: response.data.users})
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const searchFieldChange = event => {
        setSearchInputValue(event.target.value); 
        if(event.target.value == ""){
            dispatch({type: SEARCH_PRODUCT, keyword: event.target.value, index: 0}); 
        }
    }

    const onSelectedItemSearch = (index) => {
        switch(index){
            case 0:{
                setPlaceholder("Поиск по наименованию продукта...");
                setSearchItemIndex(index);
                break;
            }
            case 1:{
                setPlaceholder("Поиск по наименованию категории...");
                setSearchItemIndex(index);
                break;
            }
        }
    }

    const onSelectedItem = (index) => {
        switch(index){
            case 0:{
                openCategoriesModal();
                break;
            }
            case 1:{
                getUsersList();
                openUsersModal();
                break;
            }
        }
    }

    return(
        console.log(user),
        <div>
            <CreateNewProduct user={user} categories={props.categories} isOpen={isCreateModalOpen} onClose={closeModal} onRetrieveData={handleRetrieveData}></CreateNewProduct>
            <ModifyCategories categories={props.categories} isOpen={isCategoryModalOpen} onClose={closeCategoriesModal} onRetrieveData={handleRetrieveDataCategories}></ModifyCategories>
            <ModifyUsers users={user.users} isOpen={isUserModalOpen} onClose={closeUsersModal} onRetrieveData={handleRetrieveDataUsers}></ModifyUsers>
            <div className='searchBarHeader'>
                <div>
                    <img className='imgLogo' src={logo}></img>
                </div>
                <div className='newButton'>
                    <button type="button" className=" btn btn-primary" onClick={() => newProduct()}>Добавить продукт</button>
                </div>
                <div>
                    <input className='searchProductInput form-control' onChange={searchFieldChange} 
                    placeholder={searchItemPlaceholder} type='text' value={searchInputValue}></input>
                </div>  
                <Dropdown className="mx-2 dropdownStyle">
                    <button type="button" className="searchButton btn btn-primary" onClick={() => search()}>Поиск</button>
                    <Dropdown.Toggle id="dropdown-autoclose-inside"></Dropdown.Toggle>
                    <Dropdown.Menu id="drop-down-menu-items">
                        <Dropdown.Item id="drop-down-menu-item" type="button" onClick={() => onSelectedItemSearch(0)}>по наименованию продукта</Dropdown.Item>
                        <Dropdown.Item id="drop-down-menu-item" type="button" onClick={() => onSelectedItemSearch(1)}>по наименованию категории</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                {
                    user.userRole != 1 ?
                        <Dropdown className="mx-2 dropdownControlStyle">
                            <button type="button" className="controlButton btn btn-primary">Управление</button>
                        <Dropdown.Toggle id="dropdown-autoclose-inside"></Dropdown.Toggle>
                            <Dropdown.Menu id="drop-down-menu-items">
                                { user.userRole != 1 ?
                                    <Dropdown.Item id="drop-down-menu-item" type="button" onClick={() => onSelectedItem(0)}>Управление категориями</Dropdown.Item> : "" 
                                }
                                {
                                    user.IsAdmin ? <Dropdown.Item id="drop-down-menu-item" type="button" onClick={() => onSelectedItem(1)}>Управление пользователями</Dropdown.Item> : ""
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                     : <div></div>
                }
                <div className='exitButton' style={{marginLeft: margin == 1 ? "auto" : ""}}>
                    <button type="button" className=" btn btn-primary" onClick={() => exit()}>Выход</button>
                </div>
            </div>
        </div>
    )
}

export default SearchBar;