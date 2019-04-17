export interface SalaInterface {
  idSala?: string;
  nombreSala?: string;
  nombreCongreso?: string;
  fechaCongreso?: string;
  nombreSesion?: string;
  fechaInicioEvento?: string;
  fechaFinalizacionEvento?: string;

  // Uso necesario para la parte de roles.
  userUid?: string;
}
