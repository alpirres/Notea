import { Pipe, PipeTransform } from '@angular/core';
import { note } from '../Model/note';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform( valor: note[], texto: string): note[] {

    if (texto === '' ){
      return valor;
    }

   texto = texto.toLocaleLowerCase();

    return valor.filter( (nota) =>{
      return nota.title.toLocaleLowerCase().includes(texto) || nota.description.toLocaleLowerCase().includes(texto)
    });
  }

}
