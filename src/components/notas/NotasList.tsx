import { useState, useEffect } from 'react';
import { notasApi, alumnosApi, materiasApi } from '../../services/api';
import type { Nota, Alumno, Materia } from '../../types';
import toast from 'react-hot-toast';
import { FaPlus, FaTimes, FaSave, FaSearch } from 'react-icons/fa';

const NotasList = () => {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAlumnoId, setSelectedAlumnoId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    alumnoId: '',
    materiaId: '',
    valor: '',
    fechaRegistro: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [alumnosRes, materiasRes] = await Promise.all([
        alumnosApi.getAll(),
        materiasApi.getAll(),
      ]);
      setAlumnos(alumnosRes.data);
      setMaterias(materiasRes.data);
    } catch (error) {
      toast.error('Error al cargar los datos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotasByAlumno = async (alumnoId: number) => {
    try {
      const response = await notasApi.getByAlumno(alumnoId);
      setNotas(response.data);
    } catch (error) {
      toast.error('Error al cargar las notas');
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await notasApi.create({
        alumnoId: parseInt(formData.alumnoId),
        materiaId: parseInt(formData.materiaId),
        valor: parseFloat(formData.valor),
        fechaRegistro: formData.fechaRegistro,
      });
      toast.success('Nota registrada correctamente');
      handleCloseModal();
      if (selectedAlumnoId) {
        fetchNotasByAlumno(selectedAlumnoId);
      }
    } catch (error) {
      toast.error('Error al registrar la nota');
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      alumnoId: '',
      materiaId: '',
      valor: '',
      fechaRegistro: new Date().toISOString().split('T')[0],
    });
  };

  const handleAlumnoSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAlumnoId) {
      fetchNotasByAlumno(selectedAlumnoId);
    } else {
      toast.error('Seleccione un alumno');
    }
  };

  if (loading) {
    return <div className="loading">Cargando datos...</div>;
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Gestión de Notas</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <FaPlus /> Registrar Nota
        </button>
      </div>

      <div className="search-section">
        <form onSubmit={handleAlumnoSearch} className="search-form">
          <div className="form-group">
            <label>Buscar notas por alumno:</label>
            <div className="search-input-group">
              <select
                value={selectedAlumnoId || ''}
                onChange={(e) => setSelectedAlumnoId(parseInt(e.target.value))}
                required
              >
                <option value="">Seleccione un alumno</option>
                {alumnos.map((alumno) => (
                  <option key={alumno.id} value={alumno.id}>
                    {alumno.nombre} {alumno.apellido}
                  </option>
                ))}
              </select>
              <button type="submit" className="btn btn-primary">
                <FaSearch /> Buscar
              </button>
            </div>
          </div>
        </form>
      </div>

      {notas.length > 0 && (
        <div className="table-container">
          <h2>Notas del Alumno</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Materia</th>
                <th>Nota</th>
                <th>Fecha Registro</th>
              </tr>
            </thead>
            <tbody>
              {notas.map((nota) => (
                <tr key={nota.id}>
                  <td>{nota.id}</td>
                  <td>{nota.materiaNombre}</td>
                  <td>
                    <span className={`nota-badge ${nota.valor >= 3 ? 'aprobado' : 'reprobado'}`}>
                      {nota.valor.toFixed(1)}
                    </span>
                  </td>
                  <td>{new Date(nota.fechaRegistro).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="nota-stats">
            <div className="stat-card">
              <h3>Promedio</h3>
              <p className="stat-value">
                {(notas.reduce((sum, n) => sum + n.valor, 0) / notas.length).toFixed(1)}
              </p>
            </div>
            <div className="stat-card">
              <h3>Total Materias</h3>
              <p className="stat-value">{notas.length}</p>
            </div>
            <div className="stat-card">
              <h3>Aprobadas</h3>
              <p className="stat-value">{notas.filter(n => n.valor >= 3).length}</p>
            </div>
            <div className="stat-card">
              <h3>Reprobadas</h3>
              <p className="stat-value">{notas.filter(n => n.valor < 3).length}</p>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Registrar Nota</h2>
              <button className="btn-close" onClick={handleCloseModal}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Alumno:</label>
                <select
                  value={formData.alumnoId}
                  onChange={(e) =>
                    setFormData({ ...formData, alumnoId: e.target.value })
                  }
                  required
                >
                  <option value="">Seleccione un alumno</option>
                  {alumnos.map((alumno) => (
                    <option key={alumno.id} value={alumno.id}>
                      {alumno.nombre} {alumno.apellido}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Materia:</label>
                <select
                  value={formData.materiaId}
                  onChange={(e) =>
                    setFormData({ ...formData, materiaId: e.target.value })
                  }
                  required
                >
                  <option value="">Seleccione una materia</option>
                  {materias.map((materia) => (
                    <option key={materia.id} value={materia.id}>
                      {materia.nombre} ({materia.codigo})
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Nota (0-5):</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.valor}
                  onChange={(e) =>
                    setFormData({ ...formData, valor: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Fecha de Registro:</label>
                <input
                  type="date"
                  value={formData.fechaRegistro}
                  onChange={(e) =>
                    setFormData({ ...formData, fechaRegistro: e.target.value })
                  }
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  <FaTimes /> Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  <FaSave /> Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotasList;
