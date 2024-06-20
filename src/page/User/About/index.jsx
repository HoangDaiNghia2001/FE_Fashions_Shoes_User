import { useEffect } from "react"
import { TabTitle } from '../../../utils/TabTitle'
const About = () => {
    useEffect(() => {
        TabTitle('About')
    }, [])

    return <div className="min-h-screen flex items-center justify-center">
        <p className="text-[180px] italic text-eclipse tracking-[6px]">About Page</p>
    </div>
}

export default About