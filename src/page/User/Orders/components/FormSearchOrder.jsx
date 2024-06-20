import { DatePicker, Form, Select } from "antd"
import { useForm } from "antd/es/form/Form";
import { LIST_ORDER_STATUS, LIST_PAYMENT_METHOD } from "constants/variable"
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY'

const FormSearchOrder = (props) => {
    const { orders, setValueFilter } = props

    const [formSearchOrder] = useForm()

    const onFinish = (values) => {
        let orderDateStart;
        let orderDateEnd;
        if (values.orderDate !== undefined) {
            orderDateStart = values.orderDate[0]?.format("YYYY-MM-DD HH:MM:ss")
            orderDateEnd = values.orderDate[1]?.format("YYYY-MM-DD HH:MM:ss")
        }

        let deliveryDateStart;
        let deliveryDateEnd;
        if (values.deliveryDate !== undefined) {
            deliveryDateStart = values.deliveryDate[0]?.format("YYYY-MM-DD HH:MM:ss")
            deliveryDateEnd = values.deliveryDate[1]?.format("YYYY-MM-DD HH:MM:ss")
        }

        let receivingDateStart;
        let receivingDateEnd;
        if (values.receivingDate !== undefined) {
            receivingDateStart = values.receivingDate[0]?.format("YYYY-MM-DD HH:MM:ss")
            receivingDateEnd = values.receivingDate[1]?.format("YYYY-MM-DD HH:MM:ss")
        }

        setValueFilter({
            ...values,
            orderDate: undefined,
            deliveryDate: undefined,
            receivingDate: undefined,
            orderDateStart: orderDateStart,
            orderDateEnd: orderDateEnd,
            deliveryDateStart: deliveryDateStart,
            deliveryDateEnd: deliveryDateEnd,
            receivingDateStart: receivingDateStart,
            receivingDateEnd: receivingDateEnd,
        })
    }

    const onReset = () => {
        setValueFilter({})
    }

    return <div className="w-[25%] py-3 px-4 bg-white border sticky top-[85px] h-[460px] border-light-gray rounded-[8px]">
        <p className='text-[20px] uppercase text-black font-semibold tracking-[1.2px] mb-3'>
            Total
            <span className="text-red-custom font-bold">({orders.data.length})</span>
        </p>
        <Form
            name="formSearchOrder"
            form={formSearchOrder}
            id={formSearchOrder}
            onFinish={onFinish}
            onReset={onReset}
            autoComplete="off"
            layout="vertical"
        >
            <div className="flex justify-between">
                <Form.Item
                    label={<p className="text-eclipse text-[16px] tracking-[0.75px] font-semibold">Order status</p>}
                    name="orderStatus"
                    style={{
                        width: '48%',
                        marginBottom: 10
                    }}
                >
                    <Select
                        options={LIST_ORDER_STATUS}
                    />
                </Form.Item>

                <Form.Item
                    label={<p className="text-eclipse text-[16px] tracking-[0.75px] font-semibold">Payment Method</p>}
                    name="paymentMethod"
                    style={{
                        width: '48%',
                        marginBottom: 10
                    }}
                >
                    <Select
                        options={LIST_PAYMENT_METHOD} />
                </Form.Item>
            </div>

            <Form.Item
                label={<p className="text-eclipse text-[16px] tracking-[0.75px] font-semibold">Order Date</p>}
                name="orderDate"
                style={{
                    width: '100%',
                    marginBottom: 10
                }}
            >
                <RangePicker
                    style={{
                        width: '100%'
                    }}
                    format={dateFormat}
                />
            </Form.Item>

            <Form.Item
                label={<p className="text-eclipse text-[16px] tracking-[0.75px] font-semibold">Delivery Date</p>}
                name="deliveryDate"
                style={{
                    width: '100%',
                    marginBottom: 10
                }}
            >
                <RangePicker
                    style={{
                        width: '100%'
                    }}
                    format={dateFormat}
                />
            </Form.Item>

            <Form.Item
                label={<p className="text-eclipse text-[16px] tracking-[0.75px] font-semibold">Receiving Date</p>}
                name="receivingDate"
                style={{
                    width: '100%',
                    marginBottom: 10
                }}
            >
                <RangePicker
                    style={{
                        width: '100%'
                    }}
                    format={dateFormat}
                />
            </Form.Item>
            <div className="flex items-center justify-center mt-6">
                <button type="reset" form={formSearchOrder} className="button-cancel mr-3 px-10 py-2 text-[12.5px] min-w-[140px]">
                    Clear
                </button>
                <button type="submit" form={formSearchOrder} className="button-custom ml-3 px-10 py-2 text-[12.5px] min-w-[140px]">
                    Search
                </button>
            </div>
        </Form>
    </div>
}

export default FormSearchOrder