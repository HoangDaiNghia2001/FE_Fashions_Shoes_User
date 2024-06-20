import { useEffect } from 'react'
import { TabTitle } from 'utils/TabTitle'

const Contact = () => {
    useEffect(() => {
        TabTitle('Contact')
    }, [])

    return <div className="min-h-screen flex items-center justify-center">
        <p className="text-[180px] italic text-eclipse tracking-[6px]">Contact Page</p>
    </div>
}

export default Contact