import React, { useState } from 'react';
import './Navigation.css';
import LogoCrest from './LogoCrest';
import * as Scroll from 'react-scroll';

const NAV_LINKS = [
  { to: 'aboutScroll', label: 'About' },
  { to: 'workScroll', label: 'Work' },
  { to: 'prizmaScroll', label: 'Prizma' },
  { to: 'skillsScroll', label: 'Skills' },
];

function Navigation() {
  const ScrollLink = Scroll.Link;
  const [reloadLogo, setReloadLogo] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  const spinLogo = () => {
    setReloadLogo(false);
    setTimeout(() => setReloadLogo(true), 1);
  };

  const handleNavClick = () => {
    spinLogo();
    setShowMenu(false);
  };

  const renderNavLink = (link, className = 'aboutLink') => (
    <ScrollLink
      key={link.to}
      to={link.to}
      spy={true}
      smooth={true}
      duration={500}
      offset={-100}
      isDynamic={true}
      className={className}
      activeClass="aboutLinkActive"
      onClick={handleNavClick}
    >
      {link.label}
    </ScrollLink>
  );

  return (
    <>
      <div className="navBar">
        <div className="navContent">
          {NAV_LINKS.slice(0, 2).map((link) => renderNavLink(link))}
          <div id="logoNameDiv">
            <LogoCrest />
          </div>
          {NAV_LINKS.slice(2).map((link) => renderNavLink(link))}
          <a
            className="aboutLink"
            id="contactLink"
            href="mailto:jon.halquist@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact
          </a>
        </div>
      </div>

      <div className="navBarSmall">
        <div className="navContentSmall">
          <div id="logoMenu" onClick={() => setShowMenu((prev) => !prev)}>
            {reloadLogo && <LogoCrest />}
            {!reloadLogo && <LogoCrest />}
          </div>
          {showMenu && (
            <div id="menuContents">
              {NAV_LINKS.map((link) => renderNavLink(link, link.to === 'skillsScroll' ? 'skillsLink' : 'aboutLink'))}
              <a className="aboutLink" id="contactLink" href="mailto:jon.halquist@gmail.com">
                Contact
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navigation;
