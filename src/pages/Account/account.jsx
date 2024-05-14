import React from 'react';
import './account.css';


function Account() {
  return (
    <div className='fullScreen'>
      <div className='main-container'>
        <div className='profileContainer'>
          <div className='profileImg'>
            <img src='https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg' alt='Profile' />
          </div>
          <div className='profileName'>
            <h1>Name</h1>
          </div>
          <div>
            <button  className='btnLogout'>Logout</button>
          </div>
        </div>
      </div>
      <div className='options-container'>
        <div>Bag</div>
        
        <div>My Orders</div>
        <div>Explore</div>
      </div>
    </div>
  );
}

export default Account;
