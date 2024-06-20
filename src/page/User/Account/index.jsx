import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { TabTitle } from 'utils/TabTitle'
import { accountSelector } from './AccountSlice'
import AccountHeader from './components/AccountHeader'
import AccountImage from './components/AccountImage'
import AccountInformation from './components/AccountInformation'
import './Style.css'
const Account = (props) => {
    const account = useSelector(accountSelector)

    const user = JSON.parse(localStorage.getItem("user"))

    const [imageFile, setImageFile] = useState(user?.imageBase64)

    useEffect(() => {
        TabTitle('My account')
    }, [])

    return <div className="account min-h-[calc(100vh-80px)] py-10 bg-honeydew flex justify-center items-center">
        <Spin tip="Loading..." spinning={account.isLoading} size='large'>
            <div className='w-[1000px] min-h-[500px] bg-white px-7 py-5 rounded-[8px]'>
                <AccountHeader />
                <div className='flex justify-between items-start relative w-full mb-4'>
                    <AccountInformation imageFile={imageFile} openNotification={props.openNotification} />
                    <AccountImage imageFile={imageFile} setImageFile={setImageFile} />
                </div>
            </div>
        </Spin>
    </div>
}

export default Account