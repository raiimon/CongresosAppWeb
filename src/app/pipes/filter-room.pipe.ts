import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRoom'
})
export class FilterRoomPipe implements PipeTransform {

  transform(value: any, arg: any): any {

    // Condicional que comprueba que el valor, tenga 2 carácteres mínimo.
    if (arg === '' || arg.length < 2) {
      return value;
    } else {
      const resultPosts = [];

      for (const post of value) {
        if (this.removeAccents(post.nombreSala.toLocaleLowerCase()).indexOf(this.removeAccents(arg.toLowerCase())) > -1) {
          resultPosts.push(post);
        }
      }
      return resultPosts;
    }
  }

  // Función para eliminar acentos
  removeAccents(value) {
    return value
      .replace(/á/g, 'a')
      .replace(/é/g, 'e')
      .replace(/í/g, 'i')
      .replace(/ó/g, 'o')
  }

}