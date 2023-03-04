import { useCookies } from 'react-cookie';

export default function useHeaderFooter() {

    const [cookies] = useCookies();
    const userId = btoa(cookies.userId) || null;
    const token = cookies.token || null;
    
    if (userId === null || userId === 'undefined' || token === null || token === 'undefined') {
        return false;
    } else {
        return true;
    }
}