// Obtenemos el interface de Roles.
export interface Roles {
  editor?: boolean;
  admin?: boolean;
}

export interface UserInterface {
  id?: string;
  name?: string;
  email?: string;
  photoUrl?: string;
  emailVerified: boolean;

  // Crear roles.
  roles?: Roles;
}
