import Button from "components/FormControl/Button"
import InputField from "components/FormControl/InputField/InputField"
import SelectField from "components/FormControl/SelectField"
import { LIST_GENDER } from "constants/variable"
import { Form, Formik, useFormikContext } from "formik"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { ConvertDate } from "utils/ConvertDate"
import * as Yup from 'yup'
import { getDistrictByProvinceAsync, getWardByDistrictAsync, getProvinceAsync, updateInformationAsync } from "../AccountSlice"

const AccountInformation = (props) => {
    const dispatch = useDispatch()

    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [provinceCode, setProvinceCode] = useState('')
    const [districtCode, setDistrictCode] = useState('')

    const user = JSON.parse(localStorage.getItem("user"))

    const handleSave = async (values) => {
        const userRequest = { ...values, ...{ avatarBase64: props.imageFile } }

        const res = await dispatch(updateInformationAsync(userRequest));

        if (res.payload.success) {
            localStorage.setItem("user", JSON.stringify(res.payload.results))
            props.openNotification(res.payload.message, 'success')
        } else {
            props.openNotification(res.payload.message, 'error')
        }
    }

    const validation = Yup.object({
        firstName: Yup.string().required('Please input your first name !!!'),
        lastName: Yup.string().required('Please input your last name !!!'),
        email: Yup.string().required('Please input your email !!!')
            .email('Invalid email format !!!'),
        mobile: Yup.string().required('Please input your mobile !!!'),
    })

    const GetValues = () => {
        const { values } = useFormikContext()

        useEffect(() => {
            setProvinceCode(values.province)
            setDistrictCode(values.district)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [values.province, values.district])

        return null
    }

    const handleChangeProvince = (e, setFieldValue) => {
        setFieldValue('province', e.target.value)
        setFieldValue('district', '');
        setFieldValue('ward', '');
        setDistricts([])
        setWards([])
    };

    const handleChangeDistrict = (e, setFieldValue) => {
        setFieldValue('district', e.target.value);
        setFieldValue('ward', '');
        setWards([])
    };

    const getProvince = async () => {
        const response = await dispatch(getProvinceAsync())
        setProvinces(response.payload.map((item) => {
            return {
                value: item.code,
                label: item.name
            }
        }))
    }

    useEffect(() => {
        getProvince()
        getDistrictByProvince(provinceCode)
        getWardByDistrict(districtCode)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // get District
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
    useEffect(() => {
        getDistrictByProvince(provinceCode)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [provinceCode])


    // get Ward
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
        getWardByDistrict(districtCode)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [districtCode])

    return <div className="account--information w-[70%] pr-14 border-r border-light-gray">

        <Formik
            initialValues={{
                ...user, createAt: ConvertDate(user.createAt)
            }}
            onSubmit={handleSave}
            validationSchema={validation}>
            {
                formikProps => {
                    return <Form>
                        <div className="flex justify-between items-center">
                            <div className="w-[48.5%]">
                                <InputField title='Create At' type='text' name='createAt' disabled disable={true} />
                            </div>
                            <div className="w-[48.5%]">
                                <InputField title='Email' type='text' name='email' disabled disable={true} />
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="w-[48.5%]">
                                <InputField title='First Name' type='text' name='firstName' />
                            </div>
                            <div className="w-[48.5%]">
                                <InputField title='Last Name' type='text' name='lastName' />
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="w-[48.5%]">
                                <InputField title='Mobile' type='text' name='mobile' />
                            </div>
                            <div className="w-[48.5%]">
                                <SelectField title='Gender' name='gender' options={LIST_GENDER} placeholder='Select your gender' />
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="w-[48.5%]">
                                <InputField title='Street Address' name='address' type='text' />
                            </div>

                            <div className="w-[48.5%]">
                                <SelectField onChange={(e) => handleChangeProvince(e, formikProps.setFieldValue)} title='Province' name='province' options={provinces} placeholder='Select your province' />
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="w-[48.5%]">
                                <SelectField onChange={(e) => handleChangeDistrict(e, formikProps.setFieldValue)} title='District' name='district' options={districts} placeholder='Select your district' />
                            </div>
                            <div className="w-[48.5%]">
                                <SelectField title='Ward' name='ward' options={wards} placeholder='Select your ward' />
                            </div>
                        </div>

                        <Button name='Save' />
                        <GetValues />
                    </Form>
                }
            }
        </Formik>
    </div>

}

export default AccountInformation