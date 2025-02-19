import React, { useEffect, useState } from "react";
//import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head} from '@inertiajs/react';
import axios from 'axios';
//import { Select2 } from "select2-react-component";
import Select from "react-select"; // Importar react-select

export default function BarCode({ auth, prototipos, componentes }) {
    const [selectedTable, setSelectedTable] = useState('prototipo'); // Estado para la tabla seleccionada
    const [selectedSerial, setSelectedSerial] = useState([]); // Estado para el serial seleccionado
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        // Asegurar que los seriales seleccionados existan en la lista actual
        const newData = selectedTable === "prototipo" ? prototipos : componentes;
        setSelectedSerial((prevSelected) =>
            prevSelected.filter((serial) => newData.some((item) => item.serial === serial))
        );
    }, [selectedTable, prototipos, componentes]);

    // Función para manejar la generación del PDF
    const handleGeneratePDF = () => {   
        console.log(selectedSerial)     
        if (!selectedSerial) {
            alert('Por favor, seleccione al menos un serial.');
            return;
        }
    
        setIsGenerating(true);
    
        // Hacer la solicitud con axios
        axios({
            url: `/generar-codigo-barras/${encodeURI(selectedSerial.map(c => c.label).join(','))}`,
            method: 'GET',
            responseType: 'blob', // Importante para manejar archivos binarios
        })
        .then((response) => {
            // Crear un enlace temporal para descargar el archivo
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'codigo-barras.pdf'); // Nombre del archivo
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); // Limpiar el enlace
        })
        .catch((error) => {
            console.error('Error al descargar el PDF:', error);
            alert('Error al generar el PDF. Por favor, intenta nuevamente.');
        })
        .finally(() => {
            setIsGenerating(false);
        });
    };

    /*const handleSerialChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
        console.log(selectedOptions)
        setSelectedSerial(selectedOptions);
    }*/

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Generar Código de Barras</h2>}
        >
            <Head title="Generar Código de Barras" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                         <div className="flex flex-wrap gap-6 mb-6">
                            {/* Selector de tabla */}
                            <div className="flex-1">
                                <label htmlFor="table" className="block text-sm font-medium text-gray-700">
                                    Selecciona la tabla:
                                </label>
                                <select
                                    id="table"
                                    value={selectedTable}
                                    onChange={(e) => {
                                        setSelectedTable(e.target.value);
                                        setSelectedSerial([]); // Reiniciar los seriales seleccionados
                                    }}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="prototipo">Prototipo</option>
                                    <option value="componente">Componente</option>
                                </select>
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    Selecciona uno o más seriales:
                                </label>
                                <Select
                                    isMulti
                                    options={(selectedTable === "prototipo" ? prototipos : componentes).map(item => ({
                                        value: item.id,
                                        label: item.serial,
                                    }))}
                                    value={selectedSerial}
                                    onChange={setSelectedSerial} // react-select devuelve el objeto seleccionado
                                    className="mt-1"
                                />
                            </div>

                            {/* Mostrar los seriales seleccionados a la derecha */}
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    Seriales seleccionados:
                                </label>
                                <ul className="mt-1 bg-gray-50 p-3 rounded-md border border-gray-200">
                                    {selectedSerial.map((serial) => (
                                        <li key={serial.value} className="text-sm text-gray-600">
                                            {serial.label}
                                        </li>
                                    ))}
                                </ul>
                            </div>
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