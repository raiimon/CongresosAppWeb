export interface InvitadoInterface {
  idInvitado?: string;
  nombre?: string;
  apellidos?: string;
  dni?: string;
  telefono?: string;
  correo?: string;
  nombreCongreso?: string;

  // Uso necesario para la parte de roles.
  userUid?: string;
}
