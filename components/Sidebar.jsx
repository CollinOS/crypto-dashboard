import React from 'react'
import Link from 'next/link'
import ActiveLink from './ActiveLink'

const Sidebar = () => {
  return (
    <div className='sidebar-container border-r border-dark-border'>
      <h2 className='sidebar-logo'>Coin<span className='text-purple'>Track</span></h2>

      <ActiveLink href={`/coins`}>
        <h5>Coins</h5>
      </ActiveLink>
      <div className='p-1'/>
      <ActiveLink href={`/portfolio`}>
        <h5>Portfolio</h5>
      </ActiveLink>
      <div className='p-1'/>
      <h5 className='sidebar-element'>NFT</h5>

      <div className='sidebar-button-container'>
        <button className='sidebar-button'>Log In</button>
        <p className='text-center text-secondary text-sm pt-2'>Sign Up</p>
      </div>
    </div>
  )
}

export default Sidebar