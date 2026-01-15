import { FaGraduationCap, FaBook, FaClipboardList } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero">
        <h1>Sistema de Gestión de Calificaciones</h1>
        <p>Gestiona alumnos, materias y notas de manera eficiente</p>
      </div>

      <div className="cards-container">
        <Link to="/alumnos" className="card">
          <div className="card-icon">
            <FaGraduationCap />
          </div>
          <h2>Alumnos</h2>
          <p>Registra y gestiona información de estudiantes</p>
        </Link>

        <Link to="/materias" className="card">
          <div className="card-icon">
            <FaBook />
          </div>
          <h2>Materias</h2>
          <p>Administra el catálogo de materias</p>
        </Link>

        <Link to="/notas" className="card">
          <div className="card-icon">
            <FaClipboardList />
          </div>
          <h2>Notas</h2>
          <p>Registra y consulta calificaciones</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
