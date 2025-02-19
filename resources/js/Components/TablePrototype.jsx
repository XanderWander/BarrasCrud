import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Select from "react-select"; // Importar react-selec

const TablePrototype = ({ data, onDelete, data2 , user, componentes}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const [selectedCaracteristicas, setSelectedCaracteristicas] = useState([]);
  const [formData, setFormData] = useState({
    serial: "",
    modelo: "",
    caracteristicas: "",
    observacion: "",
  });
  const [selectedItem, setSelectedItem] = useState(null); // Estado para el elemento seleccionado
  const [errors, setErrors] = useState({});

  //setSelectedCaracteristicas(selectedCaracteristicas.split('::').map(c => ({ value: c, label: c })));

  useEffect(() => {
    console.log('form', formData);
    setFormData({
      ...formData,
      ['caracteristicas']: selectedCaracteristicas.map(c => c.value).join('::'),
    });
          //setFormData('caracteristicas', selectedCaracteristicas.map(c => c.value).join('::'));
          console.log('Caracteristicas', selectedCaracteristicas.map(c => c.value).join('::'));
          console.log('form', formData);
      }, [selectedCaracteristicas]);

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
    console.log('Form Data', formData)
    // Validar campos
    const newErrors = {};
    if (!formData.serial) newErrors.serial = "El serial es requerido.";
    if (!formData.modelo) newErrors.modelo = "El modelo es requerido.";
    if (!formData.caracteristicas) newErrors.caracteristicas = "Las Caracteristicas son requerida.";
    if (!formData.observacion) newErrors.observacion = "La Observacion es requerida.";

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsSubmitting(false);
    } else {
        try {
            const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const response = await fetch(`http://localhost:8000/prototipos/${selectedItem.id}`, {
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
    if(item.caracteristicas !== undefined && item.caracteristicas !== null && item.caracteristicas.length > 0)
      setSelectedCaracteristicas(item.caracteristicas.split('::').map(c => ({ value: c, label: c })));

    setFormData({
      serial: item.serial || "",
      modelo: item.modelo || "",
      caracteristicas: selectedCaracteristicas.map(c => c.value).join(',') || "",
      observacion: item.observacion || "",
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
            <th className="border border-gray-300 px-4 py-2">Serial</th>
            <th className="border border-gray-300 px-4 py-2">Modelo</th>
            <th className="border border-gray-300 px-4 py-2">Caracteristicas</th>
            <th className="border border-gray-300 px-4 py-2">Observaciones</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>


          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-200 text-center">
                <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                <td className="border border-gray-300 px-4 py-2">{item.serial}</td>
                <td className="border border-gray-300 px-4 py-2">{item.modelo}</td>
                <td className="border border-gray-300 px-4 py-2">{( (item.caracteristicas === null? '' : item.caracteristicas ) ).replace('::', ', ')}</td>
                <td className="border border-gray-300 px-4 py-2">{item.observacion}</td>
                <td className="border border-gray-300 px-4 py-2">
                {user.user_rol === '2' ? (
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
                ) : (
                  <span className="text-gray-500">Sin permisos</span>
                )}
                </td>
              </tr>
            ))
          ) : (
            data2.map((item, index) => (
              <tr key={index} className="hover:bg-gray-200 text-center">
                <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                <td className="border border-gray-300 px-4 py-2">{item.serial}</td>
                <td className="border border-gray-300 px-4 py-2">{item.modelo}</td>
                <td className="border border-gray-300 px-4 py-2">{( (item.caracteristicas === null? '' : item.caracteristicas ) ).replace('::', ', ')}</td>
                <td className="border border-gray-300 px-4 py-2">{item.observaciones}</td>
                <td className="border border-gray-300 px-4 py-2">
                {user.user_rol === '2' ? (
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
                ) : (
                  <span className="text-gray-500">Sin permisos</span>
                )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
              <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">Editar Datos</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* Serial */}
                  <div>
                    <label
                      htmlFor="serial"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Serial
                    </label>
                    <input
                      type="text"
                      id="serial"
                      name="serial"
                      value={formData.serial}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded focus:outline-none ${errors.serial ? "border-red-500" : ""
                        }`}
                    />
                    {errors.serial && (
                      <p className="text-red-500 text-xs mt-1">{errors.serial}</p>
                    )}

                    <label
                      htmlFor="Modelo"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Modelo
                    </label>
                    <input
                      type="text"
                      id="modelo"
                      name="modelo"
                      value={formData.modelo}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded focus:outline-none ${errors.modelo ? "border-red-500" : ""
                        }`}
                    />
                    {errors.modelo && (
                      <p className="text-red-500 text-xs mt-1">{errors.modelo}</p>
                    )}

                    <label
                      htmlFor="Caracteristicas"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Caracteristicas
                    </label>
                    {/*}
                    <input
                      type="text"
                      id="caracteristicas"
                      name="caracteristicas"
                      value={formData.caracteristicas}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded focus:outline-none ${errors.caracteristicas ? "border-red-500" : ""
                        }`}
                    />*/}
                    {errors.caracteristicas && (
                      <p className="text-red-500 text-xs mt-1">{errors.caracteristicas}</p>
                    )}

                      <Select
                          isMulti
                          type="text"
                          id="caracteristicas"
                          name="caracteristicas"
                          value={selectedCaracteristicas}                    
                          onChange={setSelectedCaracteristicas}
                          options={componentes.map(item => ({
                              value: `${item.categoria} - ${item.descripcion}`,
                              label: `${item.categoria} - ${item.descripcion}`,
                          }))}
                          className="mt-1"
                      />
                    <label
                      htmlFor="observacion"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Observaciones
                    </label>
                    <input
                      type="text"
                      id="observacion"
                      name="observacion"
                      value={formData.observacion}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded focus:outline-none ${errors.observacion ? "border-red-500" : ""
                        }`}
                    />
                    {errors.observacion && (
                      <p className="text-red-500 text-xs mt-1">{errors.observacion}</p>
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

    </div>
  );
};

export default TablePrototype;
