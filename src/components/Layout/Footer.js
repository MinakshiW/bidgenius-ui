import React from 'react'
import './Footer.css'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='footercolor'>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

            <footer className="footer_area section_padding_130_0">
                <div className="container">
                    <div className="row">
                        {/* <!-- Single Widget--> */}
                        <div className="col-12 col-sm-6 col-lg-4">
                            <div className="single-footer-widget section_padding_0_130">
                                {/* <!-- Footer Logo--> */}
                                <div className="footer-logo mb-3"></div>
                                <p>Bidgenius is completely creative, lightweight, clean auction management page.</p>
                                {/* <!-- Copywrite Text--> */}
                                <div className="copywrite-text mb-5">
                                    <p className="mb-0">© 2024 Bidgenius, Inc.</p>
                                </div>
                                {/* <!-- Footer Social Area--> */}
                                <div className="footer_social_area"><NavLink to="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Facebook"><i className="fa fa-facebook"></i></NavLink><NavLink to="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Pinterest"><i className="fa fa-pinterest"></i></NavLink><NavLink to="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Skype"><i className="fa fa-skype"></i></NavLink><NavLink to="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Twitter"><i className="fa fa-twitter"></i></NavLink></div>
                            </div>
                        </div>
                        {/* <!-- Single Widget--> */}
                        <div className="col-12 col-sm-6 col-lg">
                            <div className="single-footer-widget section_padding_0_130">
                                {/* <!-- Widget Title--> */}
                                <h5 className="widget-title">About</h5>
                                {/* <!-- Footer Menu--> */}
                                <div className="footer_menu">
                                    <ul>
                                        <li><NavLink to="#">About Us</NavLink></li>
                                        <li><NavLink to="#">Corporate Sale</NavLink></li>
                                        <li><NavLink to="#">Terms &amp; Policy</NavLink></li>
                                        <li><NavLink to="#">Community</NavLink></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Single Widget--> */}
                        <div className="col-12 col-sm-6 col-lg">
                            <div className="single-footer-widget section_padding_0_130">
                                {/* <!-- Widget Title--> */}
                                <h5 className="widget-title">Support</h5>
                                {/* <!-- Footer Menu--> */}
                                <div className="footer_menu">
                                    <ul>
                                        <li><NavLink to="#">Help</NavLink></li>
                                        <li><NavLink to="#">Support</NavLink></li>
                                        <li><NavLink to="#">Privacy Policy</NavLink></li>
                                        <li><NavLink to="#">Term &amp; Conditions</NavLink></li>
                                        <li><NavLink to="#">Help &amp; Support</NavLink></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Single Widget--> */}
                        <div className="col-12 col-sm-6 col-lg">
                            <div className="single-footer-widget section_padding_0_130">
                                {/* <!-- Widget Title--> */}
                                <h5 className="widget-title">Contact</h5>
                                {/* <!-- Footer Menu--> */}
                                <div className="footer_menu">
                                    <ul>
                                        <li><NavLink to="#">Call Centre</NavLink></li>
                                        <li><NavLink to="#">Email Us</NavLink></li>
                                        <li><NavLink to="#">Term &amp; Conditions</NavLink></li>
                                        <li><NavLink to="#">Help Center</NavLink></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer