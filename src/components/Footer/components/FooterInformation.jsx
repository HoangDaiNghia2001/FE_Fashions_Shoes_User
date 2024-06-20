const FooterInformation = (props) => {
    return <div className="footer-infromation">
        <p className="mb-3 text-[18px] text-gray98 tracking-[2px] font-semibold">{props.title}</p>
        <ul>
            {
                props.listItem.map((item, index) =>
                    <li key={index} className="mb-3 text-grey text-[14.5px] font-semibold hover:text-white duration-150 ease-in-out">
                        <span className="mr-5 ">{item.icon}</span>
                        <span>{item.content}</span>
                    </li>)
            }
        </ul>
    </div>
}

export default FooterInformation