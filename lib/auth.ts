export const setToken = (token: string, admin?: any) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('admin_token', token);
        if (admin) {
            localStorage.setItem('admin_user', JSON.stringify(admin));
        }
    }
};

export const getAdmin = () => {
    if (typeof window !== 'undefined') {
        const admin = localStorage.getItem('admin_user');
        return admin ? JSON.parse(admin) : null;
    }
    return null;
};

export const getToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('admin_token');
    }
    return null;
};

export const removeToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
    }
};

export const isAuthenticated = () => {
    const token = getToken();
    if (!token) return false;

    try {
        // Simple client-side check if token exists
        // In a real app, we might want to check expiration or verify with backend
        return true;
    } catch {
        return false;
    }
};
