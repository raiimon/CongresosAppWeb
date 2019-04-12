// Obtenemos el interface de Roles.
export interface Roles {
  editor?: boolean;
  admin?: boolean;
}

export interface UserInterface {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  photoUrl?: string;

  // Crear roles.
  roles?: Roles;
}
