import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TabTitle } from 'utils/TabTitle'
const Error404 = () => {
    useEffect(() => {
        TabTitle('Error 404')
    }, [])

    const navigate = useNavigate()
    return <div className='h-screen pb-28 text-center flex flex-col justify-center items-center'>
        <p className='relative uppercase text-gray15 text-[230px] tracking-[5.5px] font-thin inline-block mb-[-50px]'>
            oops!
            <span className='absolute bg-white py-3 px-6 uppercase font-thin text-gray15 text-[22px] left-[100px] bottom-[60px]'>404-the page can't be found</span>
        </p>
        <button className='button-custom px-7 py-2' onClick={() => { navigate('/home') }}>Back Home</button>
    </div>
}

export default Error404