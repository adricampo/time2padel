import React from 'react'
import './index.sass'

export default function () {
    return <footer className="footer">
                <div className="footer__footer-menu footer-menu">
                    <div className="footer-menu__about-us">About Us</div>
                    <div className="footer-menu__privacy">Privacy Policy</div>
                    <div className="footer-menu__contact-us">Contact us</div>
                    <div className="footer-menu__conditions">Conditions</div>
                </div>
                <div className="footer__others others">
                    <div className="others__copyright"> AC productions ©2019 </div>
                    <ul className="others__social-media social-media">
                        <li className="social-media__media-icon">
                            <a href="#"><i className="fab fa-twitter-square"></i></a>
                        </li>
                        <li className="social-media__media-icon">
                            <a href="#"><i className="fab fa-facebook-square"></i></a>
                        </li>
                        <li className="social-media__media-icon">
                            <a href="#"><i className="fab fa-instagram"></i></a>
                        </li>
                        <li className="social-media__media-icon">
                            <a href="#"><i className="fab fa-youtube-square"></i></a>
                        </li>
                        <li className="social-media__media-icon">
                            <a href="#"><i className="fab fa-pinterest-square"></i></a>
                        </li>
                    </ul>
                </div>
            </footer>
}