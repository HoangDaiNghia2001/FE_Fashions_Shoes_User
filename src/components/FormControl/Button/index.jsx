import './Style.css'
const Button = (props) => {
    return <div className='button-form mt-3 text-center'>
        <button type='submit'>{props.name}</button>
    </div>
}

export default Button