export default function useHeaderFooter() {

    const userId = atob(localStorage.getItem('userId')) || null;
    const token = localStorage.getItem('token') || null;
    
    if (userId === null || userId === 'undefined' || token === null || token === 'undefined') {
        return false;
    } else {
        return true;
    }
}