import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

/**
 * Generated class for the IFrame pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'iframe',
})
export class IFrame implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  constructor(private Dom: DomSanitizer){}

  transform(value: string, ...args) {

    return this.Dom.bypassSecurityTrustResourceUrl(value);
    //return value.toLowerCase();

  }
}
