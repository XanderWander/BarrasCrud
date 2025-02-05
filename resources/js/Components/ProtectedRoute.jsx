import { useAuth } from '../context/AuthContext';
import { Inertia } from '@inertiajs/inertia';

export default function ProtectedRoute({ children, roles = [], permissions = [] }) {
    const { user, hasRole, hasPermission } = useAuth();

    const checkAccess = () => {
        if (!user) return false;
        
        if (roles.length > 0 && !roles.some(role => hasRole(role))) return false;
        
        if (permissions.length > 0 && !permissions.some(perm => hasPermission(perm))) return false;
        
        return true;
    };

    if (!checkAccess()) {
        Inertia.visit(user ? '/unauthorized' : '/login');
        return null;
    }

    return children;
}