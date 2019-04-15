export interface CongresoInterface {
  idCongreso?: string;
  nombreCongreso?: string;
  direccion?: string;
  fechaInicioCongreso?: string;
  fechaSalidaCongreso?: string;


  // Uso necesario para la parte de roles.
  userUid?: string;
}
