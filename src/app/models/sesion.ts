export interface SesionInterface {
  id?: string;
  nombreSesion?: string;
  horaInicioSesion?: string;
  horaFinalizacionSesion?: string;

  // Uso necesario para la parte de roles.
  userUid?: string;
}
