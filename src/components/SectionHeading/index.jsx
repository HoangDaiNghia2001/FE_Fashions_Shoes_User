const SectionHeading = (props) => {
    return <div className="section-heading text-center pt-2 mb-8">
        <p className="text-[40px] tracking-[0.65px] uppercase text-gray-custom relative inline">
            {props.title}
            <span className="absolute w-[40%] h-[1px] bg-black bottom-[-4px] left-1/2 translate-x-[-50%]"></span>
        </p>

    </div>
}

export default SectionHeading