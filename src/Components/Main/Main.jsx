import React from 'react';
import './Main.css';
import { Routes, Route } from 'react-router-dom';
import Notification from '../Common/Notification/Notification';
import { routeData } from './Routes/RouteData.jsx';
import { useRecoilValue } from 'recoil';
import { mainLoadingState } from '../../Store/globalState';

export default function Routers() {

    const isLoading = useRecoilValue(mainLoadingState);

    return (
        <div >
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <Routes>
                    {
                        routeData?.map((route, index) => {
                            return (
                                <Route key={index} element={<route.route />} >
                                    <Route path={route.path} element={<route.element />} />
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
