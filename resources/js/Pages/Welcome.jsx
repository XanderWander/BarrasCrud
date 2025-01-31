import Footer from '@/Components/Footer';
import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
        <Head title="Bienvenido" />
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
        <nav className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestor de Inventario</h1>
              </div>
              <div className="flex items-center">
                {auth.user ? (
                  <Link
                    href={route("componentes")}
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Panel de Control
                  </Link>
                ) : (
                  <>
                    <Link
                      href={route("login")}
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Iniciar Sesión
                    </Link>
                    <Link
                      href={route("register")}
                      className="ml-4 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Registrarse
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow max-w-7xl w-full mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Gestiona tu Inventario con Facilidad
              </h2>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                Mantén un registro de tus herramientas, prototipos y componentes informáticos en un solo lugar.
              </p>
              <div className="mt-8">
                <Link
                  href={auth.user ? route("componentes") : route("register")}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Comenzar
                </Link>
              </div>
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Herramientas</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      Gestiona y realiza un seguimiento eficiente de tu inventario de herramientas.
                    </p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Prototipos</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      Mantén tus prototipos organizados y fácilmente accesibles.
                    </p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Componentes Informáticos</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      Realiza un seguimiento de tu inventario de piezas y componentes informáticos.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </main>

        <Footer/>
      </div>
      </>
    );
}
