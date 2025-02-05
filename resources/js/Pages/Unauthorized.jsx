import { Inertia } from '@inertiajs/inertia';

export default function Unauthorized() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
                Acceso no autorizado
            </h1>
            <button 
                onClick={() => Inertia.visit('/')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Volver al inicio
            </button>
        </div>
    );
}