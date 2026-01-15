export interface Alumno {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: string;
}

export interface Materia {
  id?: number;
  nombre: string;
  codigo: string;
  creditos: number;
}

export interface Nota {
  id?: number;
  valor: number;
  fechaRegistro: string;
  alumnoId: number;
  alumnoNombre?: string;
  materiaId: number;
  materiaNombre?: string;
}

export interface NotaRequest {
  alumnoId: number;
  materiaId: number;
  valor: number;
  fechaRegistro: string;
}
