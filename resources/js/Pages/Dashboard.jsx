import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ProtectedRoute from '@/Components/ProtectedRoute';
import { useAuth } from '@/Contexts/AuthContext';

export default function Dashboard({ auth }) {
    const { hasRole } = useAuth();

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <ProtectedRoute roles={['admin']} permissions={['view-dashboard']}>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                ¡Contenido exclusivo para administradores!
                            </div>
                        </div>
                    </div>
                </div>
            </ProtectedRoute>
        </AuthenticatedLayout>
    );
}