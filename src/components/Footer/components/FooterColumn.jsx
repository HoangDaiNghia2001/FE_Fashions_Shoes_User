const FooterColumn = (props) => {
    return <div className="footer-column">
        <p className="mb-3 text-[18px] text-gray98 tracking-[2px] font-semibold">{props.title}</p>
        <ul>
            {
                props.listItem.map((item, index) =>
                    <a key={index} href="/">
                        <li key={index} className="mb-3 tracking-[0.75px] text-grey text-[14.5px] font-semibold hover:text-white duration-150 ease-in-out">{item}</li>
                    </a>)
            }
        </ul>
    </div>
}

export default FooterColumn