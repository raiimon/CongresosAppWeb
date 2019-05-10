export interface SalaInterface {
  id?: string;
  title?: string;
  nombreCongreso?: string;
  fechaCongreso?: string;
  nombreSesion?: string;
  fechaInicioEvento?: string;
  fechaFinalizacionEvento?: string;

  // Uso necesario para la parte de roles.
  userUid?: string;
}
