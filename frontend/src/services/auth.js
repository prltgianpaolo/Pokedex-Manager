import { jwtDecode } from 'jwt-decode';

export const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded.userId; 
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};
