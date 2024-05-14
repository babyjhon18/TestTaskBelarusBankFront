import { useSelector } from 'react-redux';
import '../RowHeader/RowHeader.css';

function RowHeader(props){

    const user = useSelector(state => state.userReduser);

    return (
        <div style={{padding: "0px"}} className="col-lg-12 headerElement">
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "45px", maxWidth: "45px"}}>
            </div>
            <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "80px", maxWidth: "300px"}}>
                {props.products.productName}
            </div>
            <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "80px", maxWidth: "200px"}}>
                {props.products.fK_Category}
            </div>
            <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "80px", maxWidth: "300px"}}>
                {props.products.productDescription}
            </div>
            <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "80px", maxWidth: "200px"}}>
                {props.products.productPrice}
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
    )
}

export default RowHeader;