import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import Logo from './Logo';
import Name from './Name';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

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
      <ul className='navContainer'>
        <li className='navContent'>
          <div id='logoNameDiv'>
            <Logo />
            <Name />
          </div>
          <NavLink exact to="/" className='homeText'>Home</NavLink>
          {/* {isLoaded && sessionLinks} */}
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
