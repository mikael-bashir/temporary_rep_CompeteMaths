import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    const links = [
        { path: '/privacy-policy', label: 'Privacy Policy' },
        { path: '/terms-of-services', label: 'Terms of Service' },
        { path: '/user-guide', label: 'User Guide' },
    ];
      
    return (
        <footer className="footer">
            <div className="footer-links">
                {links.map(({ path, label }) => (
                    <Link key={path} to={path} className="footer-link">{label}</Link>
                ))}
            </div>
            <p className="footer-text">© {new Date().getFullYear()} Mikael Bashir. All rights reserved.</p>
        </footer>
    );  
}

export default Footer;
