import React from 'react';
import Link from 'next/link';
import { useSession } from '@supabase/auth-helpers-react';
import { FaCoins, FaStar, FaImage } from 'react-icons/fa';
import ActiveLink from './ActiveLink';

function Sidebar() {
  const session = useSession();

  return (
    <div className="sidebar-container border-r border-dark-border">
      <h2 className="sidebar-logo">
        Coin
        <span className="text-purple">Track</span>
      </h2>

      <ActiveLink href="/coins">
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
      <ActiveLink href="/nft">
        <h5 className="flex items-center">
          <span className="text-secondary"><FaImage className="mr-3" /></span>
          NFT
        </h5>
      </ActiveLink>

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
  );
}

export default Sidebar;
