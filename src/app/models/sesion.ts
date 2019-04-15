export interface SesionInterface {
  idSesion?: string;
  nombreSesion?: string;
  horaInicioSesion?: string;
  horaFinalizacionSesion?: string;

  // Uso necesario para la parte de roles.
  userUid?: string;
}
