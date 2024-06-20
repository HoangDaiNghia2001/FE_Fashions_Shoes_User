import { useEffect } from 'react'
import { TabTitle } from 'utils/TabTitle'

const SystemStore = () => {
    useEffect(() => {
        TabTitle('System Store')
    }, [])

    return <div className="min-h-screen flex items-center justify-center">
        <p className="text-[160px] italic text-eclipse tracking-[6px]">System Store Page</p>
    </div>
}

export default SystemStore