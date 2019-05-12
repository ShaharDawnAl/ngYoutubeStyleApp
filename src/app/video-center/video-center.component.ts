import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from 'src/app/video.service';


@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers: [VideoService]
})
export class VideoCenterComponent implements OnInit {

  constructor(private _videoService: VideoService) { }

  // Without a server database
  /*videos: Video[] = [
    {"_id":"1" ,"title":"Title1","url":"url1","description":"desc 1"},
    {"_id":"2" ,"title":"Title2","url":"url2","description":"desc 2"},
    {"_id":"3" ,"title":"Title3","url":"url3","description":"desc 3"},
    {"_id":"4" ,"title":"Title4","url":"url4","description":"desc 4"}
  ];*/

  // With a server database
  videos: Array<Video>;

  selectedVideo: Video;

  public hideNewVideo = true;
  onSelectVideo(video: any) {
    this.selectedVideo = video;
    this.hideNewVideo = true;
    console.log(this.selectedVideo);
  }

  onSubmitAddVideo(video: Video) {
    this._videoService.addVideo(video)
      .subscribe(resNewVideo => { this.videos.push(resNewVideo); this.selectedVideo = resNewVideo; });
    this.hideNewVideo = true;
  }

  ngOnInit() {
    this._videoService.getVideos().subscribe(resVideoData => this.videos = resVideoData);
  }

  newVideo() {
    this.hideNewVideo = false;
  }

  onUpdateVideoEvent(video: any) {
    this._videoService.updateVideo(video)
      .subscribe(resUpdatedVideo => video = resUpdatedVideo);
    this.selectedVideo = null;
  }

  onDeleteVideoEvent(video: any) {
    const videoArray = this.videos;
    this._videoService.deleteVideo(video)
      .subscribe(resUpdatedVideo => {
        for (let i = 0; i < videoArray.length; i++) {
          if (videoArray[i]._id === video._id) {
            videoArray.splice(i, 1);
          }
        }
      });
    this.selectedVideo = null;
  }


}
