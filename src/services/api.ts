import axios from 'axios';
import type { Alumno, Materia, Nota, NotaRequest } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Alumnos API
export const alumnosApi = {
  getAll: () => api.get<Alumno[]>('/alumnos'),
  getById: (id: number) => api.get<Alumno>(`/alumnos/${id}`),
  create: (alumno: Omit<Alumno, 'id'>) => api.post<Alumno>('/alumnos', alumno),
  update: (id: number, alumno: Omit<Alumno, 'id'>) => api.put<Alumno>(`/alumnos/${id}`, alumno),
  delete: (id: number) => api.delete(`/alumnos/${id}`),
};

// Materias API
export const materiasApi = {
  getAll: () => api.get<Materia[]>('/materias'),
  getById: (id: number) => api.get<Materia>(`/materias/${id}`),
  create: (materia: Omit<Materia, 'id'>) => api.post<Materia>('/materias', materia),
  update: (id: number, materia: Omit<Materia, 'id'>) => api.put<Materia>(`/materias/${id}`, materia),
  delete: (id: number) => api.delete(`/materias/${id}`),
};

// Notas API
export const notasApi = {
  create: (nota: NotaRequest) => api.post<Nota>('/notas', nota),
  getByAlumno: (alumnoId: number) => api.get<Nota[]>(`/notas/alumno/${alumnoId}`),
  getByMateria: (materiaId: number) => api.get<Nota[]>(`/notas/materia/${materiaId}`),
  getByAlumnoYMateria: (alumnoId: number, materiaId: number) => 
    api.get<Nota[]>(`/notas/alumno/${alumnoId}/materia/${materiaId}`),
};

export default api;
