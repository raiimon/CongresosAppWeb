import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderbyCongress'
})
export class OrderbyCongressPipe implements PipeTransform {

  transform(array: Array<any>, args: string): Array<any> {
    if (typeof args[0] === 'undefined') {
      return array;
    }
    const direction = args[0][0];
    const column = args.replace('-', '');

    array.sort((a: any, b: any) => {

      const left = Number(new Date(a[column]));
      const right = Number(new Date(b[column]));
      return (direction === '-') ? left - right : right - left;

    });
    return array;
  }

}
