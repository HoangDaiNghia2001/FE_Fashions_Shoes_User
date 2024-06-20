import TitleItem from "components/TitleItemForm"
import { ErrorMessage, Field } from "formik"
import { useState } from "react"
import TextError from "../TextError"
import './Style.css'

const InputPasswordField = (props) => {
    const { title, name, autoFocus, ...rest } = props

    const [hidePassword, setHidePassword] = useState(true)

    return <div className="input-field mb-3">
        {title && <TitleItem title={title} />}

        <div className="relative">
            <Field id={name} name={name} autoFocus={autoFocus} type={hidePassword ? 'password' : 'text'} {...rest} />
            <span onClick={() => { setHidePassword(!hidePassword) }} className="absolute right-3 top-0 bottom-0 h-full flex items-center cursor-pointer text-light-gray">
                {
                    hidePassword ? <i className="fa-regular fa-eye-slash"></i> :
                        <i className="fa-regular fa-eye"></i>
                }
            </span>
        </div>

        <ErrorMessage name={name} component={TextError} />
    </div>
}

export default InputPasswordField