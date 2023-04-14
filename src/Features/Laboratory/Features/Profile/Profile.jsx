import React from 'react';
import './Profile.css';
import { useRecoilState } from 'recoil';
import { userState } from '../../../../Store/globalState';
import { useState } from 'react';

export default function Profile() {

  const [user, setUser] = useRecoilState(userState);
  const [enableEdit, setEnableEdit] = useState(false);

  return (
    <div className='p-5 profile-container'>
      <div className='profile-card fade-in'>

      </div>
    </div>
  )
}
