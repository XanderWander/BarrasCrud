import { useState } from "react";
import Swal from "sweetalert2";
import { usePage } from "@inertiajs/react";

const TableTools = ({ data, onDelete, data2 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const { auth } = usePage().props;
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    observaciones: "",
  });
  const [selectedItem, setSelectedItem] = useState(null); // Estado para el elemento seleccionado
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Deshabilitar el botón

    // Validar campos
    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = "El.nombre es requerido.";
    if (!formData.descripcion) newErrors.descripcion = "La Descripcion es requerido.";
    if (!formData.observaciones) newErrors.observaciones = "La observaciones es requerida.";

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsSubmitting(false);
    } else {
        try {
            const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const response = await fetch(`http://localhost:8000/herramientas/${selectedItem.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'X-CSRF-TOKEN': token
                },
                body: JSON.stringify(formData),
            });
            console.log('respuesta', response)
            console.log('Respues 2', formData)
            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.errors) {
                    setErrors(errorData.errors);
                } else {
                    throw new Error("Hubo un error al actualizar los datos.");
                }
            } else {
                const data = await response.json();
                console.log("Datos actualizados correctamente:", data);
                Swal.fire({
                    title: "¡Actualizado!",
                    text: data.message, // Mensaje del backend
                    icon: "success",
                }).then(()=> {
                  window.location.reload();
                });

                setIsModalOpen(false);

            }
        } catch (error) {
            console.error(error);
            alert("Error al actualizar los datos.");
        } finally {
            setIsSubmitting(false); // Habilitar el botón
        }
    }
};

  const openEditModal = (item) => {
    setSelectedItem(item); // Establece el elemento seleccionado
    setFormData({
      nombre: item.nombre || "",
      descripcion: item.descripcion || "",
      observaciones: item.observaciones || "",
    });
    setIsModalOpen(true); // Abre el modal
  };

  return (
    <div className="overflow-x-auto">
      {/* <GeneratePDF  data={data} /> */}
      <table className="table-auto border-collapse border border-gray-400 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Descripcion</th>
            <th className="border border-gray-300 px-4 py-2">Observaciones</th>
            {auth.user.role === 'admin' && <th className="border border-gray-300 px-4 py-2">Acciones</th>}
          </tr>
        </thead>
        <tbody>


          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-200 text-center">
                <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                <td className="border border-gray-300 px-4 py-2">{item.nombre}</td>
                <td className="border border-gray-300 px-4 py-2">{item.descripcion}</td>
                <td className="border border-gray-300 px-4 py-2">{item.observaciones}</td>
                <td className="border border-gray-300 px-4 py-2">
                { auth.user.role === 'admin' && (
                    <>
                       <button
                     onClick={() => openEditModal(item)}
                     className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                   >
                     Editar
                   </button>
                   <button
                     onClick={() => onDelete(item.id)}
                     className="bg-red-500 text-white px-2 py-1 rounded ml-2 hover:bg-red-700"
                   >
                     Eliminar
                   </button>
                    </>
                )};
                </td>
              </tr>
            ))
          ) : (
            data2.map((item, index) => (
              <tr key={index} className="hover:bg-gray-200 text-center">
                <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                <td className="border border-gray-300 px-4 py-2">{item.nombre}</td>
                <td className="border border-gray-300 px-4 py-2">{item.descripcion}</td>
                <td className="border border-gray-300 px-4 py-2">{item.observaciones}</td>
                <td className="border border-gray-300 px-4 py-2">
                { auth.user.role === 'admin' && (
                    <>
                       <button
                     onClick={() => openEditModal(item)}
                     className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                   >
                     Editar
                   </button>
                   <button
                     onClick={() => onDelete(item.id)}
                     className="bg-red-500 text-white px-2 py-1 rounded ml-2 hover:bg-red-700"
                   >
                     Eliminar
                   </button>
                    </>
                )};
                </td>
              </tr>
            ))
          )}


          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
              <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">Editar Datos</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* Serial */}
                  <div>
                    <label
                      htmlFor="nombre"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="s"
                      value={formData.nombre}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded focus:outline-none ${errors.nombre ? "border-red-500" : ""
                        }`}
                    />
                    {errors.nombre && (
                      <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
                    )}

                    <label
                      htmlFor="Descripcion"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Descripcion
                    </label>
                    <input
                      type="text"
                      id="descripcion"
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded focus:outline-none ${errors.descripcion ? "border-red-500" : ""
                        }`}
                    />
                    {errors.descripcion && (
                      <p className="text-red-500 text-xs mt-1">{errors.descripcion}</p>
                    )}

                    <label
                      htmlFor="observaciones"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Observaciones
                    </label>
                    <input
                      type="text"
                      id="observaciones"
                      name="observaciones"
                      value={formData.observaciones}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded focus:outline-none ${errors.observaciones ? "border-red-500" : ""
                        }`}
                    />
                    {errors.observaciones && (
                      <p className="text-red-500 text-xs mt-1">{errors.observaciones}</p>
                    )}

                  </div>

                  {/* Botones */}
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Cerrar
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {isSubmitting ? "Guardando..." : "Guardar"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableTools;
