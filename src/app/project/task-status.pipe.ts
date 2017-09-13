import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskStatus'
})
export class TaskStatusPipe implements PipeTransform {

  transform(value: number): any {
    return null;
  }

}
