import { useLocation } from 'react-router-dom';

export default function useHeaderFooter() {
    const location = useLocation();
    const currentPath = location.pathname;

    if (
        currentPath === '/login' ||
        currentPath === '/signup' ||
        currentPath === '/forgotPassword' ||
        currentPath === '/' ||
        currentPath === '/*'
    ) {
        return false;
    } else {
        return true;
    }
}