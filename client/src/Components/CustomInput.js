import './dashboard.css';
function CustomInput(props) {
    return (
        <div onClick={props.click} className='inputWrapper'>
            <label>{props.name}</label>
            <input value={props.value} className='inputForm' placeholder={props.placeholder} onChange={props.change}/>
        </div>
    )
}
export default CustomInput;