import { Button, Form, Input, Modal, Select, Spin } from "antd"
import { accountSelector, getDistrictByProvinceAsync, getProvinceAsync, getWardByDistrictAsync } from "page/User/Account/AccountSlice"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateOrderInfoAsync } from "../OrderSlice"

const ModalOrder = (props) => {

    const { isModalOrderOpen, setIsModalOrderOpen, handleCancelModalOrder, order, formOrder, openNotification } = props

    const dispatch = useDispatch()

    const account = useSelector(accountSelector)

    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])

    const getProvinces = async () => {
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

    const handleChangeProvince = () => {
        formOrder.resetFields(['district', 'ward'])
        setDistricts([])
        setWards([])
        getDistrictByProvince(formOrder.getFieldValue(['province']))
    }

    const handleChangeDistrict = () => {
        formOrder.resetFields(['ward'])
        setWards([])
        getWardByDistrict(formOrder.getFieldValue(['district']))
    }

    const handleUpdateOrder = async (values) => {
        const response = await dispatch(updateOrderInfoAsync({
            id: order.id,
            ...values
        }))

        if (response.payload.success) {
            openNotification(response.payload.message, 'success')
            setIsModalOrderOpen(false)
            formOrder.resetFields()
        } else {
            openNotification(response.payload.message, 'error')
        }
    }

    useEffect(() => {
        if (isModalOrderOpen) {
            getProvinces()
            getDistrictByProvince(+order.province)
            getWardByDistrict(+order.district)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isModalOrderOpen])
    return <Modal
        title={"Update Order"}
        width={700}
        open={isModalOrderOpen}
        onCancel={handleCancelModalOrder}
        footer={
            <>
                <Button type="default" onClick={handleCancelModalOrder}>Cancel</Button>
                <Button type="primary" htmlType="submit" form={"formOrder" + order.id}>Update</Button>
            </>
        }>

        <Spin tip="Loading" size="large" spinning={account.isLoading}>
            <Form
                name={"formOrder" + order.id}
                form={formOrder}
                id={"formOrder" + order.id}
                onFinish={handleUpdateOrder}
                autoComplete="off"
                layout="vertical"
                style={{
                    width: '100%'
                }}
                className="form-custom"
            >
                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Full Name</p>}
                    name="fullName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your full name !!!'
                        },
                    ]}
                    style={{
                        width: '100%',
                        marginBottom: 10
                    }}
                >
                    <Input />
                </Form.Item>

                <div className=" flex justify-between items-center">
                    <Form.Item
                        label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Phone Number</p>}
                        name="phoneNumber"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number !!!'
                            },
                        ]}
                        style={{
                            width: '49%',
                            marginBottom: 10
                        }}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Alrternate Phone</p>}
                        name="alternatePhone"
                        style={{
                            width: '49%',
                            marginBottom: 10
                        }}
                    >
                        <Input />
                    </Form.Item>
                </div>

                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Address</p>}
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your address !!!'
                        },
                    ]}
                    style={{
                        width: '100%',
                        marginBottom: 10
                    }}
                >
                    <Input />
                </Form.Item>

                <div className=" flex justify-between items-center">
                    <Form.Item
                        label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Province</p>}
                        name="province"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your province !!!'
                            },
                        ]}
                        style={{
                            width: '32%',
                            marginBottom: 10
                        }}
                    >
                        <Select
                            options={provinces}
                            onChange={handleChangeProvince}
                            placeholder='Select your province'
                        />
                    </Form.Item>

                    <Form.Item
                        label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">District</p>}
                        name="district"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your district !!!'
                            },
                        ]}
                        style={{
                            width: '32%',
                            marginBottom: 10
                        }}
                    >
                        <Select
                            options={districts}
                            onChange={handleChangeDistrict}
                            placeholder='Select your district'
                        />
                    </Form.Item>

                    <Form.Item
                        label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Ward</p>}
                        name="ward"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your ward !!!'
                            },
                        ]}
                        style={{
                            width: '32%',
                            marginBottom: 10
                        }}
                    >
                        <Select
                            options={wards}
                            placeholder='Select your ward'
                        />
                    </Form.Item>
                </div>

                <Form.Item
                    name="notes"
                    label={<p className="text-eclipse text-[16.5px] font-semibold tracking-[0.75px]">Notes</p>}
                    style={{
                        width: '100%',
                        marginBottom: 25
                    }}
                >
                    <Input.TextArea rows={2} />
                </Form.Item>
            </Form>
        </Spin>
    </Modal>
}

export default ModalOrder