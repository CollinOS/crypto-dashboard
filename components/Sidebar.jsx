import React from 'react'

const Sidebar = () => {
  return (
    <div className='sidebar-container bg-gray-900'>
      <h2 className='sidebar-logo'>Coin<span className='text-orange-600'>Track</span></h2>

      <h5 className='sidebar-element'>Dashboard</h5>
      <h5 className='sidebar-element'>Portfolio</h5>
      <h5 className='sidebar-element'>Coins Rankings</h5>
      <h5 className='sidebar-element'>NFT</h5>

      <div className='sidebar-button-container'>
        <button className='sidebar-button'>Sign Up</button>
        <button className='sidebar-button'>Log In</button>
      </div>
    </div>
  )
}

export default Sidebar