import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import Home from './components/home/Home';
import AlumnosList from './components/alumnos/AlumnosList';
import MateriasList from './components/materias/MateriasList';
import NotasList from './components/notas/NotasList';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="alumnos" element={<AlumnosList />} />
          <Route path="materias" element={<MateriasList />} />
          <Route path="notas" element={<NotasList />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
