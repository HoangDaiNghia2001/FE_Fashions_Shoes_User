import TitleItem from "components/TitleItemForm"
import { ErrorMessage, Field } from "formik"
import TextError from "../TextError"
import './Style.css'

const SelectField = (props) => {
    const { name, title, options, placeholder, ...rest } = props

    return <div className="select-field mb-3">
        {title && <TitleItem title={title} />}
        <Field as='select' id={name} name={name} {...rest} >
            <option value='' disabled>{placeholder}</option>
            {
                options?.map((item, index) => <option key={index} value={item.value} >{item.label}</option>)
            }
        </Field>
        <ErrorMessage name={name} component={TextError} />
    </div>
}

export default SelectField