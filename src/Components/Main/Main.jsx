import React from 'react';
import './Main.css';
import { Routes, Route } from 'react-router-dom';
import Notification from '../Common/Notification/Notification';
import { routeData } from './Routes/RouteData.jsx';
import { useRecoilValue } from 'recoil';
import { mainLoadingState } from '../../Store/globalState';
import { Spinner } from '../Common/Spinners/Spinners.jsx';

export default function Routers() {

    const isLoading = useRecoilValue(mainLoadingState);

    return (
        <div className='main'>
            {isLoading ? (
                <div className='spinner-container'>
                    <Spinner />
                </div>
            ) : (
                <Routes>
                    {
                        routeData?.map((route, index) => {
                            return (
                                <Route key={index} element={<route.route />} >
                                    {route?.children ? (
                                        <Route path={route.path} element={<route.element />}>
                                            {
                                                (route?.children)?.map((childRoute, index) => {
                                                    return (
                                                        <Route key={index} path={childRoute?.path} element={<childRoute.element />} />
                                                    )
                                                })
                                            }
                                        </Route>
                                    ) : (
                                        <Route path={route.path} element={<route.element />} />
                                    )}
                                </Route>
                            )
                        })
                    }
                </Routes>
            )}
            <Notification />
        </div>
    )
}
