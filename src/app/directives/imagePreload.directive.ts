import {Directive, Input, HostBinding} from '@angular/core'
@Directive({
    selector: 'img[default]',
    host: {
      '(error)':'updateUrl()',
      '(load)': 'load()',
      '[src]':'src' 
     }
  })
  
 export class ImagePreloadDirective {
    @Input() src:string;
    @Input() default:string;
    @HostBinding('class') className
  
    updateUrl() {
       console.log('*** SETTING DEFAULT IMG SRC: ' + this.default);
      this.src = this.default;
    }
    load(){
      this.className = 'image-loaded';
    }
  }