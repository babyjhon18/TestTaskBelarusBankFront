import { useEffect, useState } from "react";
import $ from 'jquery';
import '../UserComponent/UserComponent.css'

const ModifyUsers = ({users, isOpen, onClose, onRetrieveData}) => {

    const [userId, setUserId] = useState('-1');
    const [userName, setUserName] = useState('Новый пользователь');
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordConfirm, setUserPasswordConfirm] = useState('');
    const [userRole, setUserRole] = useState('1');
    const [userIsAdmin, setUserIsAdmin] = useState('2');
    const [userIsBlocked, setUserIsBlocked] = useState('2');
    const [addButton, setaddButton] = useState(false);
    const [updateButton, setupdateButton] = useState(true);
    const [deleteButton, setdeleteButton] = useState(true);
    const [error, setError] = useState("")
    

    const userSelectorChange = event => {
        var index = event.nativeEvent.target.selectedIndex;
        let result = users.find(user => user.userId == event.target.value);
        setUserId(event.target.value)
        if(event.target.value == -1){
            setaddButton(false);
            setupdateButton(true);
            setdeleteButton(true);
            setUserName(event.nativeEvent.target[index].text)
            setUserPassword("");
            setUserPasswordConfirm("");
            setUserRole("1");
            setUserIsAdmin("2");
            setUserIsBlocked("2")
        }
        else{
            setaddButton(true);
            setupdateButton(false);
            setdeleteButton(false);
            setUserName(event.nativeEvent.target[index].text)
            setUserPassword("");
            setUserPasswordConfirm("");
            setUserRole(result.userRole);
            setUserIsBlocked(result.isBlocked ? 1 : 2);
            setUserIsAdmin(result.isAdmin ? 1 : 2)
        }
        $('.userName').css('display', 'flex')
    }

    const handleRetrieveData = (e) => {
        let fieldsStatus = true;
        if(e.target.id != "deleteUser"){
            $('.label-input.required').each(function(index, obj){
                if($(obj).children()[1].value == ""){
                    fieldsStatus = false;
                    setError("Обязательные поля не заполнены!");
                    $(obj).children("input").css("border-color", "red")
                    $('.error').css("display", "block")
                }
            })
            if(userPassword !== userPasswordConfirm){
                setError("Пароли не совпадают!");
                $('.error').css("display", "block")
                fieldsStatus = false;
            }
        }
        console.log(fieldsStatus)
        if(fieldsStatus){
            onRetrieveData({
                userId: userId,
                userName: userName,
                userPassword: userPassword,
                userRole: userRole,
                isBlocked: userIsBlocked == 1 ? true : false,
                isAdmin: userIsAdmin == 1 ? true : false,
                actionType: e.target.id
            });
        }
    };

    if (!isOpen) return null;
  
    return (
        <div className="createNewUser">
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="createNewProduct">
                        <div className='modal-header'>
                            <h4>Управление пользователями</h4>
                        </div>
                        <div className='modal-content'>
                            <div className='label-input required'>
                                <label>Пользователь </label>
                                <select onChange={(e) => userSelectorChange(e)} value={userId} className='form-select'>
                                    <option value={-1} selected>Новый пользователь</option>
                                    {users && Object.values(users).map((user, index) =>
                                        (
                                            <option value={user.userId}>{user.userName}</option>
                                        )
                                    )}
                                </select>
                            </div>
                            <div className='createNewUser label-input required' style={{display: "flex"}}>
                                <label>Имя пользователя</label>
                                <input value={userName} onChange={(e) => setUserName(e.target.value)} className='form-control' placeholder='Имя пользователя' ></input>
                            </div>
                            <div className='createNewUser label-input required' style={{display: "flex"}}>
                                <label>Пароль пользователя</label>
                                <input value={userPassword} onChange={(e) => setUserPassword(e.target.value)} className='form-control' placeholder='Пароль пользователя' ></input>
                            </div>
                            <div className='createNewUser label-input required' style={{display: "flex"}}>
                                <label>Повторите пароль пользователя</label>
                                <input value={userPasswordConfirm} onChange={(e) => setUserPasswordConfirm(e.target.value)} className='form-control' placeholder='Пароль пользователя' ></input>
                            </div>
                            <div className='createNewUser label-input required' style={{display: "flex"}}>
                                <label>Роль пользователя</label>
                                <select value={userRole} onChange={(e) => setUserRole(e.target.value)} className='form-select'>
                                    <option value={1} selected>Простой пользователь</option>
                                    <option value={2}>Продвинутый пользователь</option>
                                    <option value={3}>Администратор</option>
                                </select>
                            </div>
                            <div className='createNewUser label-input required' style={{display: "flex"}}>
                                <label>Пользователь админимстратор</label>
                                <select value={userIsAdmin} onChange={(e) => setUserIsAdmin(e.target.value)} className='form-select'>
                                    <option value={1} >Да</option>
                                    <option value={2} selected>Нет</option>
                                </select>
                            </div>
                            <div className='createNewUser label-input required' style={{display: "flex"}}>
                                <label>Пользователь заблокирован </label>
                                <select value={userIsBlocked} onChange={(e) => setUserIsBlocked(e.target.value)} className='form-select'>
                                    <option value={1} >Да</option>
                                    <option value={2} selected>Нет</option>
                                </select>
                            </div>
                            <div className='error' style={{display: "none"}}>
                                {error}
                            </div>
                        </div>
                    </div>
                <div className='modal-footer'>
                    <button id="addUser" disabled={addButton} className='btn btn-primary' onClick={(e) => handleRetrieveData(e)}> Добавить</button>
                    <button id="updateUser" disabled={updateButton} className='btn btn-primary' onClick={(e) => handleRetrieveData(e)}> Изменить</button>
                    <button id="deleteUser" disabled={deleteButton} className='btn btn-primary' onClick={(e) => handleRetrieveData(e)}> Удалить</button>
                    <button className='btn btn-danger' onClick={onClose}>Отмена</button>
                </div>
            </div>
        </div>
    </div>
    );
  };
  
  export default ModifyUsers;