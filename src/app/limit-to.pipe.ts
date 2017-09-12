import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitTo'
})
export class LimitToPipe implements PipeTransform {

  transform(value: string, args: number): string {
    return `${value.substr(0, args)}${value.length > args ? '...' : ''}`;
  }

}
