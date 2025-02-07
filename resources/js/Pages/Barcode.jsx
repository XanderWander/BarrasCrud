import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function BarCode({ auth, prototipos, componentes }) {
    const [selectedTable, setSelectedTable] = useState('prototipo'); // Estado para la tabla seleccionada
    const [selectedSerial, setSelectedSerial] = useState(''); // Estado para el serial seleccionado
    const [isGenerating, setIsGenerating] = useState(false);
    // Función para manejar la generación del PDF
    const handleGeneratePDF = () => {
        if (!selectedSerial) {
            alert('Por favor, selecciona un serial.');
            return;
        }
    
        setIsGenerating();
        
        router.visit(`/generar-codigo-barras/${selectedSerial}`, {
            method: 'get',
            preserveState: true,
            onError: (errors) => {
                alert('Error al generar el PDF. Por favor, intenta nuevamente.');
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Generar Código de Barras</h2>}
        >
            <Head title="Generar Código de Barras" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {/* Selector de tabla */}
                        <div className="mb-6">
                            <label htmlFor="table" className="block text-sm font-medium text-gray-700">
                                Selecciona la tabla:
                            </label>
                            <select
                                id="table"
                                value={selectedTable}
                                onChange={(e) => {
                                    setSelectedTable(e.target.value);
                                    setSelectedSerial(''); // Reiniciar el serial seleccionado
                                }}
                                className="mt-1 block w-1/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="prototipo">Prototipo</option>
                                <option value="componente">Componente</option>
                            </select>
                        </div>

                        {/* Selector de serial */}
                        <div className="mb-6">
                            <label htmlFor="serial" className="block text-sm font-medium text-gray-700">
                                Selecciona un serial:
                            </label>
                            <select
                                id="serial"
                                value={selectedSerial}
                                onChange={(e) => setSelectedSerial(e.target.value)}
                                className="mt-1 block w-1/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">-- Selecciona un serial --</option>
                                {selectedTable === 'prototipo'
                                    ? prototipos.map((prototipo) => (
                                          <option key={prototipo.id} value={prototipo.serial}>
                                              {prototipo.serial}
                                          </option>
                                      ))
                                    : componentes.map((componente) => (
                                          <option key={componente.id} value={componente.serial}>
                                              {componente.serial}
                                          </option>
                                      ))}
                            </select>
                        </div>

                        {/* Botón para generar el PDF */}
                        <button
                            onClick={handleGeneratePDF}
                            disabled={isGenerating}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                        >
                            {isGenerating ? 'Generando PDF...' : 'Generar Código de Barras en PDF'}
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
   );
}