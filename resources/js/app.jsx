import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { AuthProvider } from './context/AuthContext'; // Contexto de autenticación

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        
        // Obtener el usuario autenticado desde las props de Inertia
        const initialUser = props.initialPage.props.auth.user;

        root.render(
            <AuthProvider initialUser={initialUser}>
                <App {...props} />
            </AuthProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});