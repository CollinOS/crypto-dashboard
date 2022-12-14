import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from '@supabase/auth-helpers-react';
import { FaCoins, FaStar, FaImage } from 'react-icons/fa';
import { AiOutlineMenu, AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import ActiveLink from './ActiveLink';

function Sidebar() {
  const session = useSession();
  const [clicked, setClicked] = useState(false);

  const isClicked = () => {
    clicked == true ? setClicked(false) : setClicked(true);
  };

  return (
    <div>
      <div className={clicked == true ? 'fixed h-[100%] w-[100%] z-10 bg-overlay duration-100 xl:hidden' : ''} onClick={clicked == true ? isClicked : isClicked}>
        
      </div>
      { clicked == true
        ? <AiOutlineArrowLeft className="z-30 cursor-pointer fixed top-16 left-72 text-purple text-xl block pointer xl:hidden" onClick={() => { isClicked(); }} />
        : <AiOutlineArrowRight className="z-30 cursor-pointer fixed top-16 left-16 text-secondary text-xl block pointer xl:hidden" onClick={() => { isClicked(); }} />}
      <div className={clicked == true ? 'sidebar-show duration-100' : 'sidebar-hide duration-100 xl:block'}>
        <h2 className="sidebar-logo">
          Coin
          <span className="text-purple">Track</span>
        </h2>

        <ActiveLink href="/">
          <h5 className="flex items-center">
            <span className="text-secondary"><FaCoins className="mr-3" /></span>
            Coins
          </h5>
        </ActiveLink>
        <div className="p-1" />
        <ActiveLink href="/portfolio">
          <h5 className="flex items-center">
            <span className="text-secondary"><FaStar className="mr-3" /></span>
            Portfolio
          </h5>
        </ActiveLink>
        <div className="p-1" />
        <div className='sidebar-element text-secondary duration-100'>
          <h5 className="flex items-center">
            <span className="text-secondary"><FaImage className="mr-3" /></span>
            NFT (soon)
          </h5>
        </div>

        <div className="sidebar-button-container">
          <Link href="/account">
            {!session ? (
              <button className="sidebar-button" onClick={() => window.localStorage.clear()}>Sign In</button>
            ) : (
              <button className="sidebar-button">Account</button>
            )}
            {/* <p className='text-center text-secondary text-sm pt-2'>Sign Up</p> */}
          </Link>
        </div>
      </div> 
    </div>
  );
}

export default Sidebar;
