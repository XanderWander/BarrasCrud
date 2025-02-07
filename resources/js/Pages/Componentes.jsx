import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import TableComponent from '@/Components/TableComponent';
import Modal2 from '@/Components/Modal2';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react'

export default function Componentes({ auth }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const { componentes } = usePage().props;
    const [filteredData, setFilteredData] = useState(componentes);
    const { data, setData, post, processing, errors } = useForm({
        serial: '',
        descripcion: '',
        categoria: '',
        observacion: '',
    });


    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)


    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        if (term === "") {
            setFilteredData(componentes);
        } else {
            const filtered = componentes.filter((item) =>
                Object.values(item).some((value) =>
                    String(value).toLowerCase().includes(term)
                )
            );
            setFilteredData(filtered);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        post('/componentes', {
            onSuccess: () => {
                // Mostrar SweetAlert2 si la solicitud es exitosa
                Swal.fire({
                    title: '¡Información enviada con éxito!',
                    icon: 'success',
                    draggable: true,
                });
                closeModal(); // Cerrar el modal después de guardar
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

    const eliminarComponente = (id) => {
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
                router.delete(`/componentes/${id}`, {
                    onSuccess: () => {
                        Swal.fire({
                            title: '¡Eliminado!',
                            text: 'El componente ha sido eliminado.',
                            icon: 'success',
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Componentes</h2>}
        >
            <Head title="Componentes" />

            <div>

                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Buscar..."
                    className="border p-2 mx-5 rounded w-45 mb-4"
                />

                <div className='flex justify-between py-2'>
                    <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold  mx-5 py-2 px-4 rounded" target="_blank" href="http://localhost:8000/componente/pdf">Generar PDF</a>
                    <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 mx-5 text-white font-bold py-2 px-4 rounded">
                        Agregar Componente
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
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.serial ? "border-red-500" : ""}`}
                            />
                            {errors.serial && <span>{errors.serial}</span>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="descripcion" className="block text-gray-700 text-sm font-bold mb-2">
                                Descripcion
                            </label>
                            <input
                                type="text"
                                id="descripcion"
                                name="descripcion"
                                value={data.descripcion}
                                onChange={(e) => setData('descripcion', e.target.value)}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.descripcion ? "border-red-500" : ""}`}
                            />
                            {errors.descripcion && <span>{errors.descripcion}</span>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="categoria" className="block text-gray-700 text-sm font-bold mb-2">
                                Categoría
                            </label>
                            <input
                                type="text"
                                id="categoria"
                                name="categoria"
                                value={data.categoria}
                                onChange={(e) => setData('categoria', e.target.value)}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.categoria ? "border-red-500" : ""}`}
                            />
                            {errors.categoria && <span>{errors.categoria}</span>}
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
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
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
                <TableComponent onDelete={eliminarComponente} data={filteredData} data2={componentes} />
            </div>


        </AuthenticatedLayout>
    );
}