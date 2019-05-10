export interface CongresoInterface {
  idCongreso?: string;
  nombreCongreso?: string;
  direccion?: string;
  fechaInicioCongreso?: any;
  fechaSalidaCongreso?: any;
  imgCongreso?: string;

  // Uso necesario para la parte de roles.
  userUid?: string;
}
