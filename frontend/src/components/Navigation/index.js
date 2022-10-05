import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import LogoCrest from './LogoCrest';
import * as Scroll from 'react-scroll';
import Name from './Name';

function Navigation({ isLoaded }){
  const ScrollLink = Scroll.Link;
  const sessionUser = useSelector(state => state.session.user);
  const [reloadLogo, setReloadLogo] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  const spinLogo = () => {
    setReloadLogo(false)
    const reloadTimeout = setTimeout(()=> {
      setReloadLogo(true)
      clearTimeout(reloadTimeout)
    }, 1)
  }


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <>
    <div className='navBar'>
        <div className='navContent'>
          <ScrollLink
            to='aboutScroll'
            spy={true}
            smooth={true}
            duration={500}
            offset={-100}
            isDynamic={true}
            className='aboutLink'
            activeClass='aboutLinkActive'
            id='aboutLink'
            onClick={spinLogo}
          >
            About
          </ScrollLink>
          <ScrollLink
            to='skillsScroll'
            spy={true}
            smooth={true}
            duration={500}
            offset={-100}
            isDynamic={true}
            className='aboutLink'
            activeClass='aboutLinkActive'
            id='aboutLink'
            onClick={spinLogo}
          >
            Skills
          </ScrollLink>
          <div id='logoNameDiv'>
            {reloadLogo &&
              <LogoCrest />
            }
            {!reloadLogo &&
              <LogoCrest />
            }
          </div>
          <ScrollLink
            to='projectsScroll'
            spy={true}
            smooth={true}
            duration={500}
            offset={-100}
            isDynamic={true}
            className='aboutLink'
            id='projectsLink'
            activeClass='aboutLinkActive'
            onClick={spinLogo}
          >
            Projects
          </ScrollLink>
           {/* <ScrollLink
              to='contactScroll'
              spy={true}
              smooth={true}
              duration={500}
              offset={-100}
              isDynamic={true}
              className='aboutLink'
              id='contactLink'
              activeClass='aboutLinkActive'
              onClick={() => {
                spinLogo()
                setShowMenu(false)
              }}
            >
              Contact
            </ScrollLink> */}
            <a className='aboutLink' id='contactLink' href='mailto: jon.halquist@gmail.com' target="_blank">
              Contact
            </a>
          {/* <NavLink exact to="/" className='homeText'>Home</NavLink> */}
          {/* {isLoaded && sessionLinks} */}
        </div>
    </div>


    <div className='navBarSmall'>
        <div className='navContentSmall'>
          <div id='logoMenu' onClick={() => setShowMenu(prev => !prev)}>
              {reloadLogo &&
                <LogoCrest />
              }
              {!reloadLogo &&
                <LogoCrest />
              }
          </div>
          {showMenu && <div id='menuContents'>
            <ScrollLink
              to='aboutScroll'
              spy={true}
              smooth={true}
              duration={500}
              offset={-100}
              isDynamic={true}
              className='aboutLink'
              activeClass='aboutLinkActive'
              id='aboutLink'
              onClick={() => {
                spinLogo()
                setShowMenu(false)
              }}
            >
              About
            </ScrollLink>
            <ScrollLink
              to='skillsScroll'
              spy={true}
              smooth={true}
              duration={500}
              offset={-100}
              isDynamic={true}
              className='skillsLink'
              activeClass='skillsLinkActive'
              id='skillsLink'
              onClick={() => {
                spinLogo()
                setShowMenu(false)
              }}
            >
              Skills
            </ScrollLink>

            <ScrollLink
              to='projectsScroll'
              spy={true}
              smooth={true}
              duration={500}
              offset={-100}
              isDynamic={true}
              className='aboutLink'
              id='projectsLink'
              activeClass='aboutLinkActive'
              onClick={() => {
                spinLogo()
                setShowMenu(false)
              }}
            >
              Projects
            </ScrollLink>
            {/* <ScrollLink
              to='contactScroll'
              spy={true}
              smooth={true}
              duration={500}
              offset={-100}
              isDynamic={true}
              className='aboutLink'
              id='contactLink'
              activeClass='aboutLinkActive'
              onClick={() => {
                spinLogo()
                setShowMenu(false)
              }}
            >
              Contact
            </ScrollLink> */}
            <a className='aboutLink' id='contactLink' href='mailto: jon.halquist@gmail.com' target="_blank">
              Contact
            </a>
          </div> }
          {/* <NavLink exact to="/" className='homeText'>Home</NavLink> */}
          {/* {isLoaded && sessionLinks} */}
        </div>
    </div>
    </>
  );
}

export default Navigation;
