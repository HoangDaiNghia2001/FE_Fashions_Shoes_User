import FooterBottom from './components/FooterBottom'
import FooterColumn from './components/FooterColumn'
import FooterFollow from './components/FooterFollow'
import FooterInformation from './components/FooterInformation'
import './Style.css'

const Footer = () => {
    const footerInformation = {
        'title': 'Fashion Shoes',
        'listItem': [
            {
                'icon': <i className="fa-solid fa-location-dot"></i>,
                'content': '2/18, 9 Cluster, 5A Quarter, Trang Dai Ward, Bien Hoa City, Dong Nai Province'
            },
            {
                'icon': <i className="fa-solid fa-envelope"></i>,
                'content': 'hoangdainghia20012001@gmail.com',
            },
            {
                'icon': <i className="fa-solid fa-phone"></i>,
                'content': '0888346324'
            }
        ]
    }

    const listFooterColumn = [
        {
            'title': 'Brands',
            'listItem': ['Nike', 'Adidas', 'Puma', 'Converse', 'Orther'] // call Api
        },
        {
            'title': 'Business',
            'listItem': ['Company Profile', 'Social Responsilbility', 'Brand Kit', 'Media',]
        },
        {
            'title': 'About',
            'listItem': ['Board of Directors', 'Company Profile', 'Careers', 'Converse', 'Numbers Speak']
        }
    ]

    const footerFollow = {
        'title': 'Follow Us',
        'listItem': [
            <i className="fa-brands fa-facebook"></i>,
            <i className="fa-brands fa-twitter"></i>,
            <i className="fa-brands fa-square-instagram"></i>,
            <i className="fa-brands fa-youtube"></i>,
            <i className="fa-brands fa-google"></i>
        ]
    }
    return <div className="footer z-50">
        <div className="flex bg-black py-6 px-20 justify-between">
            <FooterInformation title={footerInformation.title} listItem={footerInformation.listItem} />

            {
                listFooterColumn.map((item, index) => <FooterColumn key={index} title={item.title} listItem={item.listItem} />)
            }

            <FooterFollow title={footerFollow.title} listItem={footerFollow.listItem} />
        </div>
        <FooterBottom title='Copyright © 2023 Fashion Shoes. Powered by Hoang Dai Nghia' />
    </div>
}

export default Footer