import { Component, OnInit, EventEmitter } from '@angular/core';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
  // tslint:disable-next-line:use-input-property-decorator
  inputs: ['video'],
  // tslint:disable-next-line:use-output-property-decorator
  outputs: ['updateVideoEvent', 'deleteVideoEvent']
})
export class VideoDetailComponent implements OnInit {

  constructor() { }

  private editTitle = false;

  // tslint:disable-next-line:member-ordering
  private updateVideoEvent = new EventEmitter();

  // tslint:disable-next-line:member-ordering
  video: any;

  private deleteVideoEvent = new EventEmitter();

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    this.editTitle = false;
  }

  onTitleClick() {
    this.editTitle = true;
  }
  updateVideo() {
    this.updateVideoEvent.emit(this.video);
  }
  deleteVideo() {
    this.deleteVideoEvent.emit(this.video);
  }

  ngOnInit() {
  }

}
