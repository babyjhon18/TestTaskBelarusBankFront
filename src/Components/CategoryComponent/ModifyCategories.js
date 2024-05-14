import { useEffect, useState } from "react";
import $ from 'jquery';
import '../CategoryComponent/CategoryComponent.css'

const ModifyCategories = ({categories, isOpen, onClose, onRetrieveData}) => {

    const [categoryId, setProductCategory] = useState('-1');
    const [categoryName, setCategoryName] = useState('Новая категория');
    const [addButton, setaddButton] = useState(false);
    const [updateButton, setupdateButton] = useState(true);
    const [deleteButton, setdeleteButton] = useState(true);
    const [error, setError] = useState("")

    const categorySelectorChange = event => {
        var index = event.nativeEvent.target.selectedIndex;
        setCategoryName(event.nativeEvent.target[index].text)
        setProductCategory(event.target.value)
        if(event.target.value == -1){
            setaddButton(false);
            setupdateButton(true);
            setdeleteButton(true);
        }
        else{
            setaddButton(true);
            setupdateButton(false);
            setdeleteButton(false);
        }
        $('.categoryName').css('display', 'flex')
    }

    const handleRetrieveData = (e) => {
        let fieldsStatus = true;
        $('.label-input.required').each(function(index, obj){
            if($(obj).children()[1].value == ""){
                fieldsStatus = false;
                setError("Обязательные поля не заполнены!");
                $(obj).children("input").css("border-color", "red")
                $('.error').css("display", "block")
            }
        })
        console.log(fieldsStatus)
        if(fieldsStatus){
            onRetrieveData({
                categoryId: categoryId,
                categoryName: categoryName,
                actionType: e.target.id
            });
        }
    };

    if (!isOpen) return null;
  
    return (
        <div className="createNewCategory">
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="createNewProduct">
                        <div className='modal-header'>
                            <h4>Управление категориями</h4>
                        </div>
                        <div className='modal-content'>
                            <div className='label-input required'>
                                <label>Категория</label>
                                <select onChange={(e) => categorySelectorChange(e)} value={categoryId} className='form-select'>
                                    <option value={-1} selected>Новая категория</option>
                                    {categories && Object.values(categories).map((category, index) =>
                                        (
                                            <option value={category.categoryId}>{category.categoryName}</option>
                                        )
                                    )}
                                </select>
                            </div>
                            <div className='categoryName label-input required' style={{display: "flex"}}>
                                <label>Наименование категории</label>
                                <input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className='form-control' placeholder='Название категории' ></input>
                            </div>
                            <div className='error' style={{display: "none"}}>
                                {error}
                            </div>
                        </div>
                    </div>
                <div className='modal-footer'>
                    <button id="addCategory" disabled={addButton} className='btn btn-primary' onClick={(e) => handleRetrieveData(e)}> Добавить</button>
                    <button id="updateCategory" disabled={updateButton} className='btn btn-primary' onClick={(e) => handleRetrieveData(e)}> Изменить</button>
                    <button id="deleteCategory" disabled={deleteButton} className='btn btn-primary' onClick={(e) => handleRetrieveData(e)}> Удалить</button>
                    <button className='btn btn-danger' onClick={onClose}>Отмена</button>
                </div>
            </div>
        </div>
    </div>
    );
  };
  
  export default ModifyCategories;