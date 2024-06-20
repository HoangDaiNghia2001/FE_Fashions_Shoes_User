const FooterFollow = (props) => {
    return <div className="footer-follow">
        <p className="mb-5 text-[18px] text-gray98 tracking-[2px] font-semibold text-center">{props.title}</p>
        <ul className="flex justify-between items-center">
            {
                props.listItem.map((item, index) => <a href="/" key={index}>
                    <li className="footer-follow--item mx-2 w-8 h-8 rounded-[4px] flex justify-center items-center " key={index}>
                        <span>{item}</span>
                        <span>{item}</span>
                        <span>{item}</span>
                    </li>
                </a>)
            }
        </ul>
    </div>
}

export default FooterFollow