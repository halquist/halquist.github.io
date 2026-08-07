import React, { useEffect, useState } from 'react';
import './Navigation.css';
import LogoCrest from './LogoCrest';
import * as Scroll from 'react-scroll';

const SCROLL_DELTA = 8;
const TOP_REVEAL_Y = 60;

const NAV_LINKS = [
  { to: 'aboutScroll', label: 'About' },
  { to: 'workScroll', label: 'Work' },
  { to: 'skillsScroll', label: 'Skills' },
  { to: 'prizmaScroll', label: 'Prizma' },
];

function Navigation() {
  const ScrollLink = Scroll.Link;
  const [reloadLogo, setReloadLogo] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [navHidden, setNavHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;

      if (currentScrollY <= TOP_REVEAL_Y) {
        setNavHidden(false);
      } else if (scrollDelta > SCROLL_DELTA) {
        setNavHidden(true);
        setShowMenu(false);
      } else if (scrollDelta < -SCROLL_DELTA) {
        setNavHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      <div className={`navBar${navHidden ? ' navBarHidden' : ''}`}>
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

      <div className={`navBarSmall${navHidden ? ' navBarHidden' : ''}`}>
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
