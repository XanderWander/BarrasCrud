import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import Modal2 from '@/Components/Modal2';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react'
import TablePrototype from '@/Components/TablePrototype';

export default function Prototipos({ auth }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const { prototipos } = usePage().props;
    const [filteredData, setFilteredData] = useState(prototipos);
    const { data, setData, post, processing, errors } = useForm({
        serial: '',
        modelo: '',
        caracteristicas: '',
        observacion: '',
    });

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        if (term === "") {
            setFilteredData(prototipos);
        } else {
            const filtered = prototipos.filter((item) =>
                Object.values(item).some((value) =>
                    String(value).toLowerCase().includes(term)
                )
            );
            setFilteredData(filtered);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        post('/prototipos', {
            onSuccess: () => {
                // Mostrar SweetAlert2 si la solicitud es exitosa
                Swal.fire({
                    title: '¡Información enviada con éxito!',
                    icon: 'success',
                    draggable: true,
                }).then(() => {
                    closeModal(); 
                    window.location.reload(); 
                });
            },
            onError: (errors) => {
                // Mostrar SweetAlert2 si hay errores
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al enviar la información.',
                    icon: 'error',
                    draggable: true,
                });
            },
        });
    };

    const eliminarPrototipo = (id) => {
        // Mostrar un diálogo de confirmación con SweetAlert2
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo',
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma, hacer la solicitud DELETE
                router.delete(`/prototipos/${id}`, {
                    onSuccess: () => {
                        Swal.fire({
                            title: '¡Eliminado!',
                            text: 'El componente ha sido eliminado.',
                            icon: 'success',
                        }).then(() => {
                            window.location.reload(); 
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            title: 'Error',
                            text: 'Hubo un problema al eliminar el componente.',
                            icon: 'error',
                        });
                    },
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Prototipos</h2>}
        >
            <Head title="Prototipos" />
            <div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Buscar..."
                    className="border p-2 mx-5 rounded w-42 mb-4"
                />

                <div className='flex justify-between py-2'>
                    <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mx-5 px-4 rounded" target="_blank" href="http://localhost:8000/componente/pdf">Generar PDF</a>
                    <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 mx-5 text-white font-bold py-2 px-4 rounded">
                        Agregar Prototipo
                    </button>

                </div>

                <Modal2 isOpen={isModalOpen} onClose={closeModal} title={"Registrar Componente"}>
                    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
                        <div className="mb-4">
                            <label htmlFor="serial" className="block text-gray-700 text-sm font-bold mb-2">
                                Serial
                            </label>
                            <input
                                type="text"
                                id="serial"
                                name="serial"
                                value={data.serial}
                                onChange={(e) => setData('serial', e.target.value)}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.Serial ? "border-red-500" : ""}`}
                            />
                            {errors.serial && <span>{errors.serial}</span>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="modelo" className="block text-gray-700 text-sm font-bold mb-2">
                                Modelo
                            </label>
                            <input
                                type="text"
                                id="modelo"
                                name="modelo"
                                value={data.modelo}
                                onChange={(e) => setData('modelo', e.target.value)}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.modelo ? "border-red-500" : ""}`}
                            />
                            {errors.modelo && <span>{errors.modelo}</span>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="caracteristicas" className="block text-gray-700 text-sm font-bold mb-2">
                                Caracteristicas
                            </label>
                            <input
                                type="text"
                                id="caracteristicas"
                                name="caracteristicas"
                                value={data.caracteristicas}
                                onChange={(e) => setData('caracteristicas', e.target.value)}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.caracteristicas ? "border-red-500" : ""}`}
                            />
                            {errors.caracteristicas && <span>{errors.caracteristicas}</span>}
                        </div>

                        <div className="mb-6">
                            <label htmlFor="observacion" className="block text-gray-700 text-sm font-bold mb-2">
                                Observaciones
                            </label>
                            <textarea
                                id="observacion"
                                name="observacion"
                                value={data.observacion}
                                onChange={(e) => setData('observacion', e.target.value)}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.observacion ? "border-red-500" : ""} h-24`}
                            ></textarea>
                            {errors.observacion && <span>{errors.observacion}</span>}
                        </div>

                        <div className="flex items-center justify-end gap-4">

                            <button
                                onClick={() => setIsModalOpen(false)}
                                type="button"
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Cerrar
                            </button>

                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                {processing ? 'Guardando...' : 'Guardar'}
                            </button>
                        </div>
                    </form>
                </Modal2>
                {/* obtenerComponentes={obtenerComponentes} */}
                <TablePrototype onDelete={eliminarPrototipo} data={filteredData} data2={prototipos} />
            </div>

        </AuthenticatedLayout>
    );
}