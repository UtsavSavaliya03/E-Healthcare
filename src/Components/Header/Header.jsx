import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import Avatar from 'react-avatar';
import { useRecoilState } from 'recoil';
import { mainLoadingState, userState, sidebarStateAtom } from '../../Store/globalState';
import useHeader from './Hooks/useHeader.jsx';
import useLogin from './Hooks/useLogin.jsx';
import { findMe } from './Services/userServices.jsx';
import { useCookies } from 'react-cookie';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Header() {

    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies();
    const [isOpenSidebar, setIsOpenSidebar] = useRecoilState(sidebarStateAtom);
    const [user, setUser] = useRecoilState(userState);
    const [isLoading, setIsLoading] = useRecoilState(mainLoadingState);
    const userId = btoa(cookies.userId) || null;
    const token = cookies.token || null;
    const isVisibleHeader = useHeader();
    const isLogin = useLogin();

    useEffect(() => {
        findUser();
    }, []);

    const findUser = async () => {
        if (isLogin) {
            const headers = {
                'Authorization': token
            }
            setIsLoading(true);
            const userResponse = await findMe(userId, headers);
            if (userResponse) {
                if (userResponse?.data) {
                    setUser({ ...userResponse?.data, isLogin: true });
                }
                setIsLoading(false);
            } else {
                setIsLoading(false);
                logoutHandler();
            }
        }
    }

    const logoutHandler = () => {
        setIsOpenSidebar(false);
        removeCookie('userId');
        removeCookie('token');
        setUser({});
        navigate('/login');
    }

    const sidebarHandler = () => {
        setIsOpenSidebar(!isOpenSidebar);
    }

    return (
        <>
            {isVisibleHeader &&
                (
                    <div className='header-container d-flex justify-content-between align-items-center'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <i class="fas fa-bars fa-2x mx-2 header-bar" onClick={sidebarHandler}></i>
                            <h3 className='mx-2'>E-Healthcare</h3>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <button className='mr-4 btn' onClick={logoutHandler}>Logout</button>
                            {isLoading ? (
                                <div className='user-icon-skeleton-container'>
                                    <Skeleton circle={true} height={40} width={40} />
                                </div>
                            ) : (
                                <Avatar size='40' round name={`${user?.fName} ${user?.lName}`} />
                            )}
                        </div>
                    </div>
                )
            }
        </>
    )
}
