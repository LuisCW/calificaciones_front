import { useState, useEffect } from 'react';
import { alumnosApi } from '../../services/api';
import type { Alumno } from '../../types';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaSave } from 'react-icons/fa';

const AlumnosList = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAlumno, setEditingAlumno] = useState<Alumno | null>(null);
  const [formData, setFormData] = useState<Omit<Alumno, 'id'>>({
    nombre: '',
    apellido: '',
    email: '',
    fechaNacimiento: '',
  });

  useEffect(() => {
    fetchAlumnos();
  }, []);

  const fetchAlumnos = async () => {
    try {
      setLoading(true);
      const response = await alumnosApi.getAll();
      setAlumnos(response.data);
    } catch (error) {
      toast.error('Error al cargar los alumnos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAlumno) {
        await alumnosApi.update(editingAlumno.id!, formData);
        toast.success('Alumno actualizado correctamente');
      } else {
        await alumnosApi.create(formData);
        toast.success('Alumno creado correctamente');
      }
      fetchAlumnos();
      handleCloseModal();
    } catch (error) {
      toast.error('Error al guardar el alumno');
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar este alumno?')) {
      try {
        await alumnosApi.delete(id);
        toast.success('Alumno eliminado correctamente');
        fetchAlumnos();
      } catch (error) {
        toast.error('Error al eliminar el alumno');
        console.error(error);
      }
    }
  };

  const handleEdit = (alumno: Alumno) => {
    setEditingAlumno(alumno);
    setFormData({
      nombre: alumno.nombre,
      apellido: alumno.apellido,
      email: alumno.email,
      fechaNacimiento: alumno.fechaNacimiento,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingAlumno(null);
    setFormData({
      nombre: '',
      apellido: '',
      email: '',
      fechaNacimiento: '',
    });
  };

  if (loading) {
    return <div className="loading">Cargando alumnos...</div>;
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Gestión de Alumnos</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <FaPlus /> Nuevo Alumno
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Fecha Nacimiento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map((alumno) => (
              <tr key={alumno.id}>
                <td>{alumno.id}</td>
                <td>{alumno.nombre}</td>
                <td>{alumno.apellido}</td>
                <td>{alumno.email}</td>
                <td>{new Date(alumno.fechaNacimiento).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-icon btn-edit"
                    onClick={() => handleEdit(alumno)}
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-icon btn-delete"
                    onClick={() => handleDelete(alumno.id!)}
                    title="Eliminar"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingAlumno ? 'Editar Alumno' : 'Nuevo Alumno'}</h2>
              <button className="btn-close" onClick={handleCloseModal}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Apellido:</label>
                <input
                  type="text"
                  value={formData.apellido}
                  onChange={(e) =>
                    setFormData({ ...formData, apellido: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Fecha de Nacimiento:</label>
                <input
                  type="date"
                  value={formData.fechaNacimiento}
                  onChange={(e) =>
                    setFormData({ ...formData, fechaNacimiento: e.target.value })
                  }
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  <FaTimes /> Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  <FaSave /> Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumnosList;
