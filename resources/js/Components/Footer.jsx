import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow mt-auto">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-gray-500 dark:text-gray-300">
                © {new Date().getFullYear()} Venezolana de Industria Tecnologica. Todos los derechos reservados.
              </p>
            </div>
          </footer>
  )
}

export default Footer