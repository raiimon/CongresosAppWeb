export interface BookInterface {
  id?: string;
  titulo?: string;
  idioma?: string;
  descripcion?: string;
  portada?: string;
  precio?: string;
  link_amazon?: string;
  autor?: string;
  oferta?: string;

  // Uso necesario para la parte de roles.
  userUid?: string;
}
