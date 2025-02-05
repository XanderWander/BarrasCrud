import { createContext, useContext, useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

const AuthContext = createContext();

export function AuthProvider({ children, initialUser }) {
    const { props } = usePage();
    const [user, setUser] = useState(initialUser || props.auth.user);
    
    // Sincronizar el usuario cuando cambien las props
    useEffect(() => {
        setUser(props.auth.user);
    }, [props.auth.user]);

    const hasRole = (role) => user?.roles?.includes(role);
    const hasPermission = (permission) => user?.permissions?.includes(permission);

    return (
        <AuthContext.Provider value={{ 
            user, 
            setUser, 
            hasRole, 
            hasPermission 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);