import { useState } from 'react';
import '../ProductComponent/ProductComponent.css'

const DeleteProduct = ({product, isOpen, onClose, onRetrieveData}) => {

    const [productId, setProductId] = useState(product.productId);
    const [productName, setProductName] = useState(product.productName);
    const [productDescription, setProductDescription] = useState(product.productDescription);
    const [productPrice, setProductPrice] = useState(product.productPrice);

    const handleRetrieveData = () => {
        onRetrieveData({
            productId: productId,
         });
    };

    if (!isOpen) return null;
  
    return (
        <div className="createNewProduct">
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="createNewProduct">
                        <div className='modal-header'>
                            <h4>Удалить продукт</h4>
                        </div>
                        <div className='modal-content'>
                            <label style={{width: "100%"}}>Вы уверены, что хотите удалить продукт "{productName}", с описанием "{productDescription}", за {productPrice} рублей?</label>
                    </div>
                </div>
            <div className='modal-footer'>
                <button className='btn btn-primary'onClick={handleRetrieveData} >Удалить</button>
                <button className='btn btn-danger' onClick={onClose}>Отмена</button>
            </div>
        </div>
        </div>
    </div>
    );
  };
  
  export default DeleteProduct;