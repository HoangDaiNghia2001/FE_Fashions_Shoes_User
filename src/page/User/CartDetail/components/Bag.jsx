import { Checkbox, Empty, Popconfirm } from 'antd';
import CartItem from 'components/CartItem';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { deleteMultiCartItemAsync } from '../CartSlice';

const Bag = (props) => {

    const { listCartItem, setListCartItem, checkedList, setCheckedList, openNotification } = props

    const dispatch = useDispatch()

    const [checkDeleteMulti, setCheckDeleteMulti] = useState(false)

    // check box
    const plainOptions = listCartItem.data.map((item) => { return item.id })
    const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;
    const checkAll = plainOptions.length === checkedList.length;

    const isCheckedItem = (id) => {
        return checkedList.includes(id)
    }

    const handleChoose = (id) => {
        const isChecked = isCheckedItem(id)
        if (isChecked) {
            setCheckedList(prevState => {
                const newCheckedList = prevState.filter(item => item !== id)
                if (!newCheckedList.length) {
                    setCheckDeleteMulti(false)
                }
                return newCheckedList
            })
        }
        else {
            setCheckDeleteMulti(true)
            setCheckedList(prevState => {
                const newCheckedList = [...prevState, id]
                return newCheckedList
            })
        }
    };

    const onCheckAllChange = (e) => {
        if (e.target.checked) {
            setCheckDeleteMulti(true)
        } else {
            setCheckDeleteMulti(false)
        }
        setCheckedList(e.target.checked ? plainOptions : [])
    };

    const handleLoadMore = () => {
        setListCartItem({
            ...listCartItem,
            visible: listCartItem.visible + 5
        })
    }

    const handleCollapse = () => {
        setListCartItem({
            ...listCartItem,
            visible: 5
        })
        window.scrollTo(0, 0)
    }

    const handleDeleteMultiCartItems = async () => {
        const response = await dispatch(deleteMultiCartItemAsync(checkedList))
        if (response.payload.success) {
            setCheckDeleteMulti(false)
            setCheckedList([])
            openNotification(response.payload.message, 'success')
        } else {
            openNotification(response.payload.message, 'error')
        }
    }

    return <div className="w-[60%]">
        <p className="text-eclipse font-semibold text-[32px] tracking-[2px]">Cart ({listCartItem.data.length})</p>
        {
            listCartItem.data.length === 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='There are no items in your bag.' /> :
                <>
                    <div className="flex justify-between items-center mt-4 mb-2">
                        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                            <p className="ml-4 text-[16px] tracking-[0.75px] font-semibold text-eclipse">Choose All</p>
                        </Checkbox>
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete some products?"
                            onConfirm={handleDeleteMultiCartItems}
                            okText="Yes"
                            cancelText="No"
                            disabled={!checkDeleteMulti}
                        >
                            <button
                                className={`${checkDeleteMulti ? 'button-custom' : 'button-disable'} text-[12.5px] px-4 py-1 min-w-[92px]`}
                            >
                                Delete
                            </button>
                        </Popconfirm>
                    </div>
                    {
                        listCartItem.data.slice(0, listCartItem.visible).map((item, index) => <div key={index} className="flex w-full">
                            <Checkbox onChange={() => handleChoose(item.id)} value={item.id} checked={isCheckedItem(item.id)} ></Checkbox>
                            <CartItem cart={item} openNotification={openNotification} checkDeleteMulti={checkDeleteMulti} setCheckedList={setCheckedList} />
                        </div>)
                    }
                    <div className='text-center mt-6'>
                        {
                            listCartItem.visible < listCartItem.data.length ?
                                <button onClick={handleLoadMore} className="button-custom py-2 px-12">Load more</button>
                                :
                                (listCartItem.data.length > 5 && <button onClick={handleCollapse} className="button-custom py-2 px-12">Collapse</button>)
                        }
                    </div>
                </>
        }

    </div>
}

export default Bag