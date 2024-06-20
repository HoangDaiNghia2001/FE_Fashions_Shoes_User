import * as Yup from 'yup'
import { Form, Formik, useFormikContext } from "formik"
import InputField from 'components/FormControl/InputField/InputField'
import SelectField from 'components/FormControl/SelectField'
import { useDispatch, useSelector } from 'react-redux'
import { getDistrictByProvinceAsync, getProvinceAsync, getWardByDistrictAsync, loginSelector } from 'page/Login/LoginSlice'
import { useEffect, useState } from 'react'
import { Spin } from 'antd'

const Shipping = (props) => {

    const { setStep, shipping, setShipping } = props

    const user = JSON.parse(localStorage.getItem("user"))

    const dispatch = useDispatch()

    const login = useSelector(loginSelector)

    const [provices, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])

    const [provinceCode, setProvinceCode] = useState('')
    const [districtCode, setDistrictCode] = useState('')

    const handleSubmit = (values) => {
        setStep(1)
        setShipping(values)
    }

    const validation = Yup.object({
        firstName: Yup.string().required('Please input your first name!!!'),
        lastName: Yup.string().required('Please input your last name!!!'),
        phoneNumber: Yup.string().required('Please input your phone number!!!'),
        address: Yup.string().required('Please input your street address!!!'),
        province: Yup.string().required('Please input your province address!!!'),
        district: Yup.string().required('Please input your district address!!!'),
        ward: Yup.string().required('Please input ward province address!!!')

    })

    const handleChangeProvince = (e, setFieldValue) => {
        setFieldValue("province", e.target.value)
        setFieldValue("district", "")
        setFieldValue("ward", "")
        setDistricts([])
        setWards([])
    }

    const handleChangeDistrict = (e, setFieldValue) => {
        setFieldValue("district", e.target.value)
        setFieldValue("ward", "")
        setWards([])
    }

    const getProvince = async () => {
        const response = await dispatch(getProvinceAsync())
        setProvinces(response.payload.map((item) => {
            return {
                value: item.code,
                label: item.name
            }
        }))
    }

    const getDistrictByProvince = async (value) => {
        if (value) {
            const response = await dispatch(getDistrictByProvinceAsync(value))
            setDistricts(response.payload.districts?.map((item) => {
                return {
                    value: item.code,
                    label: item.name
                }
            }))
        }
    }

    const getWardByDistrict = async (value) => {
        if (value) {
            const response = await dispatch(getWardByDistrictAsync(value))
            setWards(response.payload.wards?.map((item) => {
                return {
                    value: item.code,
                    label: item.name
                }
            }))
        }
    }

    useEffect(() => {
        getProvince()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        getDistrictByProvince(provinceCode)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [provinceCode])

    useEffect(() => {
        getWardByDistrict(districtCode)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [districtCode])

    const GetValues = () => {
        const { values } = useFormikContext()

        useEffect(() => {
            setProvinceCode(values.province)
        }, [values.province])

        useEffect(() => {
            setDistrictCode(values.district)
        }, [values.district])

        return null;
    };

    return <Spin tip="Loading..." spinning={login.isLoading} size='large'>
        <Formik
            initialValues={shipping !== null ? shipping : {
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                province: user.province,
                district: user.district,
                ward: user.ward,
                phoneNumber: user.mobile,
                alternatePhoneNumber: user.mobile,
                note: ''
            }}
            onSubmit={handleSubmit}
            validationSchema={validation}>
            {
                formikProps => {
                    return <Form>
                        <p className='text-red-custom text-[25px] font-bold tracking-[1.2px] mb-3'>Billing details</p>

                        <div className='flex justify-between'>
                            <div className='w-[48%]'>
                                <InputField name='firstName' type='text' title='First name' />
                            </div>

                            <div className='w-[48%]'>
                                <InputField name='lastName' type='text' title='Last name' />
                            </div>
                        </div>

                        <div className='flex justify-between'>
                            <div className='w-[48%]'>
                                <InputField name='phoneNumber' type='text' title='Phone number' />
                            </div>
                            <div className='w-[48%]'>
                                <InputField name='alternatePhoneNumber' type='text' title='Alternate phone number' />
                            </div>
                        </div>

                        <div className=''>
                            <InputField name='address' type='text' title='Street address' />
                        </div>

                        <div className='flex justify-between'>
                            <div className='w-[31%]'>
                                <SelectField
                                    onChange={(e) => handleChangeProvince(e, formikProps.setFieldValue)}
                                    name='province'
                                    title='Province'
                                    options={provices}
                                    placeholder='Select your province' />
                            </div>

                            <div className='w-[31%]'>
                                <SelectField
                                    onChange={(e) => handleChangeDistrict(e, formikProps.setFieldValue)}
                                    name='district'
                                    title='District'
                                    options={districts}
                                    placeholder='Select your district' />
                            </div>

                            <div className='w-[31%]'>
                                <SelectField
                                    name='ward'
                                    title='Ward'
                                    options={wards}
                                    placeholder='Select your ward' />
                            </div>
                        </div>

                        <div className='mb-6 mt-4'>
                            <p className='text-red-custom text-[25px] font-bold tracking-[1.2px] mb-2'>Additional information</p>
                            <div>
                                <InputField name='note' type='text' title='Notes' />
                            </div>
                        </div>

                        <div className='text-center'>
                            <button type='submit' className='button-custom py-2 px-[50px] text-[18px]'>Mode of payment</button>
                        </div>

                        <GetValues />
                    </Form>
                }
            }
        </Formik>
    </Spin>
}

export default Shipping