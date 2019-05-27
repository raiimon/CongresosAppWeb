export interface EquipamientoInterface {
  idEquipamiento?: string;
  familia?: string;
  subfamilia?: string;
  producto?: string;
  numeroSerie?: string;
  descripcion?: string;
  proveedor?: string;
  valor1?: number;
  valor2?: number;
  cantidad?: number;
  disponibles?: number;
  nombreCongreso?: string;

  // Uso necesario para la parte de roles.
  userUid?: string;
}
