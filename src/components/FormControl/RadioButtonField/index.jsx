import TitleItem from 'components/TitleItemForm'
import { ErrorMessage, Field } from 'formik'
import React from 'react'
import TextError from '../TextError'
import './Style.css'
const RadioButtonField = (props) => {
    const { name, options, checked, setChecked, title, hidden, ...rest } = props

    return <div className='radion-button-field'>
        {title && <TitleItem title={title} />}
        <div className='flex justify-center items-center mb-2'>
            <Field name={name} id={name} {...rest}>
                {
                    ({ field }) => {
                        return options?.map((item, index) => {
                            return (
                                <div key={index} className="mx-4">
                                    <label htmlFor={item.id}
                                        className={`relative text-grey text-[15.5px] px-2 py-[6px] rounded-[4px] border border-light-gray cursor-pointer ${index === checked && 'border-red-custom text-red-custom'} duration-150 ease-in-out`}
                                        onClick={() => { setChecked(index) }}>
                                        <input type='radio' id={item.id} {...field} value={item.value} className={hidden} checked={field.value === item.value} />
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

export default RadioButtonField