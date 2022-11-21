import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';

function ActiveLink({ href, children }) {
  const router = useRouter();

  const handleClick = (event) => {
    event.preventDefault();
    router.push(href);
  };

  const isCurrentPath = router.pathname === href || router.asPath === href;

  return (
    <Link href={href} onClick={handleClick}>
      <div className={isCurrentPath ? 'font-bold bg-dark-hov sidebar-element duration-100' : 'sidebar-element duration-100'}>
        {children}
      </div>
    </Link>
  );
}

export default ActiveLink;
