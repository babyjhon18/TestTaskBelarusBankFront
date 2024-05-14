import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Login from '../Login/Login.js'
import Catalog from '../Catalog/Catalog.js';
import axios from 'axios';
import { SERVER_LINK, USER_LINK, VIEW_USER } from '../../Store/Constants.js';

function Main() {
    
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReduser)
    const [oneRequest, setOneRequest] = useState(true)
    
    useEffect(() => {
        axios.get(SERVER_LINK + USER_LINK + '?UserId=' + localStorage.getItem("user_id") , { 
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("access_token"),
                'Content-Type': 'application/json'
        }})
        .then((response) => {
            dispatch({type: VIEW_USER, payload: {
                userName: response.data.users.userName,
                userRole: response.data.users.userRole,
                IsAdmin: response.data.users.isAdmin
              }})
        })
        .catch((error) => {
            console.log(oneRequest)
            if(oneRequest){
                console.log(error);
                localStorage.setItem("access_token", "")
                localStorage.setItem("user_id", "")
                localStorage.setItem("user_role", "")
                setOneRequest(false);
            }
        });
    },[])

    if(localStorage.getItem("access_token") != "")
        return ( <Catalog user={user}></Catalog> )
    else{
        return ( <Login></Login> )
    }
}

export default Main;