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
    <div className='navBar'>
        <div className='navContent'>
          <ScrollLink
            to='aboutScroll'
            spy={true}
            smooth={true}
            duration={500}
            offset={-100}
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
            className='aboutLink'
            id='skillsLink'
            activeClass='aboutLinkActive'
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
            className='aboutLink'
            id='projectsLink'
            activeClass='aboutLinkActive'
            onClick={spinLogo}
          >
            Projects
          </ScrollLink>
          <ScrollLink
            to='contactScroll'
            spy={true}
            smooth={true}
            duration={500}
            offset={-100}
            className='aboutLink'
            id='contactLink'
            activeClass='aboutLinkActive'
            onClick={spinLogo}
          >
            Contact
          </ScrollLink>
          {/* <NavLink exact to="/" className='homeText'>Home</NavLink> */}
          {/* {isLoaded && sessionLinks} */}
        </div>
    </div>
  );
}

export default Navigation;
