import TitleItem from "components/TitleItemForm"
import { ErrorMessage, FastField } from "formik"
import TextError from "../TextError"
import './Style.css'

const InputField = (props) => {
    const { title, name, display, autoFocus, disable, ...rest } = props

    return <div className={`input-field mb-3 ${display && 'hidden'} ${disable && 'disable'}`}>
        {title && <TitleItem title={title} />}
        <FastField id={name} name={name} autoFocus={autoFocus} {...rest} />
        <ErrorMessage name={name} component={TextError} />
    </div>
}

export default InputField