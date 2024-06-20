import TitleItem from 'components/TitleItemForm'
import { ErrorMessage, Field } from 'formik'
import TextError from '../TextError'
import './Style.css'
const CheckBoxField = (props) => {

    //initialValues phải là []
    const { name, title, options, ...rest } = props

    return <div className='checkbox-field'>
        {title && <TitleItem title={title} />}
        <div className='flex justify-between items-center mb-2'>
            <Field name={name} id={name} {...rest}>
                {
                    ({ field }) => {
                        return options?.map((item, index) => {
                            return (
                                <div key={index}>
                                    <label htmlFor={item.id}
                                        className={`relative text-grey text-[15.5px] px-2 py-[6px] rounded-[4px] border border-light-gray cursor-pointer `}
                                    >
                                        <input type='checkbox' id={item.id} {...field} value={item.value} className='' checked={Boolean(field.value.includes(item.value))} />
                                        {item.label}
                                    </label>
                                </div>
                            )
                        })
                    }
                }
            </Field>
        </div>
        <ErrorMessage name={name} component={TextError} />
    </div>
}

export default CheckBoxField