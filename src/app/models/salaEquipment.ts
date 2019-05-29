export interface SalaEquipmentInterface {
  id?: string;
  nombreSala?: string;
  nombreCongreso?: string;
  cantidad?: string;
  familia?: string;
  subfamilia?: string;
  numeroSerie?: string;

  // Uso necesario para la parte de roles.
  userUid?: string;
}
