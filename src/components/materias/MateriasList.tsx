import { useState, useEffect } from 'react';
import { materiasApi } from '../../services/api';
import type { Materia } from '../../types';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaSave } from 'react-icons/fa';

const MateriasList = () => {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMateria, setEditingMateria] = useState<Materia | null>(null);
  const [formData, setFormData] = useState<Omit<Materia, 'id'>>({
    nombre: '',
    codigo: '',
    creditos: 0,
  });

  useEffect(() => {
    fetchMaterias();
  }, []);

  const fetchMaterias = async () => {
    try {
      setLoading(true);
      const response = await materiasApi.getAll();
      setMaterias(response.data);
    } catch (error) {
      toast.error('Error al cargar las materias');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMateria) {
        await materiasApi.update(editingMateria.id!, formData);
        toast.success('Materia actualizada correctamente');
      } else {
        await materiasApi.create(formData);
        toast.success('Materia creada correctamente');
      }
      fetchMaterias();
      handleCloseModal();
    } catch (error) {
      toast.error('Error al guardar la materia');
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar esta materia?')) {
      try {
        await materiasApi.delete(id);
        toast.success('Materia eliminada correctamente');
        fetchMaterias();
      } catch (error) {
        toast.error('Error al eliminar la materia');
        console.error(error);
      }
    }
  };

  const handleEdit = (materia: Materia) => {
    setEditingMateria(materia);
    setFormData({
      nombre: materia.nombre,
      codigo: materia.codigo,
      creditos: materia.creditos,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingMateria(null);
    setFormData({
      nombre: '',
      codigo: '',
      creditos: 0,
    });
  };

  if (loading) {
    return <div className="loading">Cargando materias...</div>;
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Gestión de Materias</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <FaPlus /> Nueva Materia
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Código</th>
              <th>Créditos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {materias.map((materia) => (
              <tr key={materia.id}>
                <td>{materia.id}</td>
                <td>{materia.nombre}</td>
                <td>{materia.codigo}</td>
                <td>{materia.creditos}</td>
                <td>
                  <button
                    className="btn btn-icon btn-edit"
                    onClick={() => handleEdit(materia)}
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-icon btn-delete"
                    onClick={() => handleDelete(materia.id!)}
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
              <h2>{editingMateria ? 'Editar Materia' : 'Nueva Materia'}</h2>
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
                <label>Código:</label>
                <input
                  type="text"
                  value={formData.codigo}
                  onChange={(e) =>
                    setFormData({ ...formData, codigo: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Créditos:</label>
                <input
                  type="number"
                  min="1"
                  value={formData.creditos}
                  onChange={(e) =>
                    setFormData({ ...formData, creditos: parseInt(e.target.value) })
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

export default MateriasList;
