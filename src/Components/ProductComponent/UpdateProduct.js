import { useState } from 'react';
import $ from 'jquery';
import '../ProductComponent/ProductComponent.css'

const UpdateProduct = ({categories, product, isOpen, onClose, onRetrieveData}) => {

    const [productId, setProductId] = useState(product.productId);
    const [productName, setProductName] = useState(product.productName);
    const [productCategory, setProductCategory] = useState(product.fK_Category);
    const [productDescription, setProductDescription] = useState(product.productDescription);
    const [productPrice, setProductPrice] = useState(product.productPrice);
    const [productGeneralDescription, setProductGeneralDescription] = useState(product.generalNote);
    const [productSpecialDescription, setProductSpecialDescription] = useState(product.specialNote);
    const [error, setError] = useState("")

    const handleRetrieveData = () => {
        let fieldsStatus = true;
        $('.label-input.required').each(function(index, obj){
            if($(obj).children()[1].value == ""){
                fieldsStatus = false;
                setError("Обязательные поля не заполнены!");
                $(obj).children("input").css("border-color", "red")
                $('.error').css("display", "block")
            }
            if($(obj).children()[1].value == "Не выбрана"){
                fieldsStatus = false;
                setError("Обязательные поля не заполнены!");
                $(obj).children("select").css("border-color", "red")
                $('.error').css("display", "block")
            }
        })
        console.log(fieldsStatus)
        if(fieldsStatus){
            onRetrieveData({
                productId: productId,
                productName: productName,
                productCategory: productCategory,
                productDescription: productDescription,
                productPrice: productPrice,
                productGeneralDescription: productGeneralDescription,
                productSpecialDescription: productSpecialDescription
            });
        }
    };

    if (!isOpen) return null;
  
    return (
        <div className="createNewProduct">
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="createNewProduct">
                        <div className='modal-header'>
                            <h4>Изменить продукт</h4>
                        </div>
                        <div className='modal-content'>
                            <div className='label-input required'>
                                <label>Намиеноваение продукта</label>
                                <input defaultValue={productName} onChange={(e) => setProductName(e.target.value)} className='form-control' type='text' placeholder='Намиеноваение продукта' ></input>
                            </div>
                            <div className='label-input required'>
                                <label>Категория</label>
                                <select onChange={(e) => setProductCategory(e.target.value)} value={productCategory} className='form-select'>
                                    <option>Не выбрана</option>
                                    {categories && Object.values(categories).map((category, index) =>
                                        (
                                            category.categoryId == productCategory ? <option selected value={category.categoryId}>{category.categoryName}</option> :
                                            <option value={category.categoryId}>{category.categoryName}</option>
                                        )
                                    )}
                                </select>
                            </div>
                            <div className='label-input required'>
                                <label>Описание</label>
                                <input defaultValue={productDescription} onChange={(e) => setProductDescription(e.target.value)} className='form-control' placeholder='Описание продукта' ></input>
                            </div>
                            <div className='label-input required'>
                                <label>Стоимость в рублях</label>
                                <input defaultValue={productPrice} onChange={(e) => setProductPrice(e.target.value)} className='form-control' placeholder='Стоимость продукта' ></input>
                            </div>
                            <div className='label-input'>
                                <label>Примечание общее</label>
                                <input defaultValue={productGeneralDescription} onChange={(e) => setProductGeneralDescription(e.target.value)} className='form-control' placeholder='Общее примечание продукта' ></input>
                            </div>
                            <div className='label-input'>
                                <label>Примечание специальное</label>
                                <input defaultValue={productSpecialDescription} onChange={(e) => setProductSpecialDescription(e.target.value)} className='form-control' placeholder='Специальное примечание продукта' ></input>
                            </div>
                            <div className='error' style={{display: "none"}}>
                                {error}
                            </div>
                    </div>
                </div>
            <div className='modal-footer'>
                <button className='btn btn-primary'onClick={handleRetrieveData} >Сохранить</button>
                <button className='btn btn-danger' onClick={onClose}>Отмена</button>
            </div>
        </div>
        </div>
    </div>
    );
  };
  
  export default UpdateProduct;