import { useState } from 'react';
import '../Login/Login.css';
import 'bootstrap/dist/css/bootstrap.css';
import { LOGIN_LINK, SERVER_LINK, SET_USER, customConfig } from '../../Store/Constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import $ from 'jquery'

function Login() {

  const dispatch = useDispatch()
  const [userName, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")


  const userNameChanged = (event) => {
    setUsername(event.target.value);
  } 
  
  const passwordChanged = (event) => {
    setPassword(event.target.value);
  } 

  function login(){
    let body = {
      "username": userName,
      "password": password
    }
    axios.post(SERVER_LINK + LOGIN_LINK, body, customConfig)
    .then(function (response) {
      console.log(response)
      localStorage.setItem("access_token", response.data.access_token)
      localStorage.setItem("user_id", response.data.userId)
      localStorage.setItem("user_role", response.data.userRole)
      dispatch({type: SET_USER, payload: {
        userName : response.data.userName,
        userAccessToken: response.data.access_token, 
        userRole: response.data.userRole,
        claims: response.data.claims,
        IsAdmin: response.data.isAdmin
      } });
    })
    .catch(function (error) {
      if(error.response.status == 403){
        setError("Неверное имя пользователя или пароль!")
        $('.error').css("display", "block")
      }
      if(error.response.status == 400){
        setError("Пользователь заблокирован!")
        $('.error').css("display", "block")
      }
      console.log(error);
    });
  }

  return (
    <div className="modal-dialog">
      <div className='modal-header'>
        <h4>
          Добро пожаловать!
        </h4>
      </div>
      <div className='modal-content'>
        <div className='label-input'>
          <label>Логин</label>
          <input defaultValue={userName} className='form-control' type='text' placeholder='Имя пользователя' onChange={userNameChanged} required></input>
        </div>
        <div className=' label-input'>
          <label>Пароль</label>
          <input defaultValue={password} className='form-control' type='password' placeholder='Пароль пользователя' onChange={passwordChanged} required></input>
        </div>
        <div className='modal-footer'>
          <button type='submit' className='btn btn-primary' onClick={login}>Вход</button>
        </div>
        <div className='error' style={{display: "none"}}>
          {error}
        </div>
      </div>
    </div>
  );
}

export default Login;
