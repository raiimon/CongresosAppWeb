export interface EventInterface {
  idEvent?: string;
  title?: string;
  nombreCongreso?: string;
  nombreSala?: string;
  resourceId?: string;
  start?: any;
  end?: any;
  color?: string;

  // Uso necesario para la parte de roles.
   userUid?: string;
}
