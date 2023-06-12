import {Pipe, PipeTransform} from '@angular/core';
import * as _ from "lodash";


@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: any[], filterString: string, property: string): any[] {
    if (value.length === 0 || !filterString) {
      return value;
    }
    let filteredData: any[] = [];
    for (let data of value) {
      if (data[property].toLowerCase().includes(filterString.toLowerCase())) {
        filteredData.push(data);
      }
    }
    return filteredData;
  }

}
