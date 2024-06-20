import SectionHeading from "components/SectionHeading"

const TrustedPartners = (props) => {

    return <div className="trusted-partnerts pb-12">
        <SectionHeading title='Trusted Partnerts' />
        <div className="w-full h250px flex py-3 px-24 bg-white justify-between items-center overflow-hidden">
            {props.listPartnerts.map((item, index) => <img key={index} src={item} alt="" className="w-[15%] h-full object-cover object" />)}
        </div>
    </div>
}

export default TrustedPartners