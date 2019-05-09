export interface CongresoInterface {
  idCongreso?: string;
  nombreCongreso?: string;
  direccion?: string;
  fechaInicioCongreso?: any;
  fechaSalidaCongreso?: any;

  // Uso necesario para la parte de roles.
  userUid?: string;
}
