const TitleItem = (props) => {
    return <p className='text-eclipse text-[17.5px] mb-[6px] font-semibold tracking-[0.75px]'>
        {props.required && <span className="text-red-custom mr-[2px]">*</span>}
        {props.title}
    </p>
}

export default TitleItem