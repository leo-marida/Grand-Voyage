import React, { useRef } from 'react';
import style from './ContactUsActivity.module.css'
import twitterIcon from '../../../../assets/x.svg'
import InstagramIcon from '../../../../assets/instagram.svg'
import FacebookIcon from '../../../../assets/facebook.svg'
import LinkedInIcon from '../../../../assets/linkedin.svg'

export default function ContactUsActivity() {
    const formRef = useRef();

    const handleClearForm = () => {
      if (formRef.current) {
        formRef.current.reset(); // Clears all inputs and textarea
      }
      alert("Your message has been sent successfully!"); // Alert to confirm message sent
    };
    return (
        <>
        <div className={style.contactContainer}>
            <div className={style.contactCard}>
                <h1 className={style.contactTitle}>Contact Us</h1>
                <p className={style.contactDescription}>
                    Planning your next adventure? Reach out to us with any questions or travel inquiries!
                </p>
                
                <form className={style.contactForm} ref={formRef}>
                    <label>
                        Full Name
                        <input type="text" placeholder="Your Name" required />
                    </label>
                    <label>
                        Email Address
                        <input type="email" placeholder="Your Email" required />
                    </label>
                    <label>
                        Message
                        <textarea placeholder="Write your message here..." rows="5" required />
                    </label>
                    <button type="button" onClick={handleClearForm}>
                        Send Message
                    </button>
                </form>

                <div className={style.socialSection}>
                    <h3>Connect with us</h3>
                    <div className={style.socialIcons}>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer">
                            <img src={FacebookIcon} alt="Facebook" className={style.socialImg} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer">
                            <img src={InstagramIcon} alt="Instagram" className={style.socialImg} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer">
                            <img src={twitterIcon} alt="Twitter" className={style.socialImg} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                            <img src={LinkedInIcon} alt="LinkedIn" className={style.socialImg} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}