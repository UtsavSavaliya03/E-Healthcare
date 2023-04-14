import React, { useState } from 'react';
import './Profile.css';
import { useRecoilState } from 'recoil';
import { userState } from '../../../../Store/globalState';

export default function Profile() {

  const [user, setUser] = useRecoilState(userState);
  const [enableEdit, setEnableEdit] = useState(false);

  return (
    <div>Patient Profile</div>
  )
}
