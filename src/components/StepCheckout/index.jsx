const StepCheckout = (props) => {
    return <>
        <div className=" tracking-[0.75px]">
            <p>.<span className="text-[16.5px] font-semibold ml-2">{props.name}</span></p>
            <p className="text-[15.5px] ml-[14px]">{props.subName}</p>
        </div>
    </>
}

export default StepCheckout