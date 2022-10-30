import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnChanges{

  @Input()
  imageSource?: string

  altText?: string;

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes.imageSource.currentValue){
      this.altText = 'No image'
    }
  }


}
