import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Video } from './video';

// import { Options } from 'videongapp/node_modules/@types/selenium-webdriver/opera';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  constructor(private _http: Http) { }

  private _getUrl = '/api/videos';

  // tslint:disable-next-line:member-ordering
  private _postUrl = '/api/video';

  // tslint:disable-next-line:member-ordering
  private _putUrl = '/api/video/';

  private _deleteUrl = '/api/video/';

  getVideos() {
    return this._http.get(this._getUrl).pipe(map((response: Response) => response.json()));
  }
  addVideo(video: Video) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.post(this._postUrl, JSON.stringify(video), options)
      .pipe(map((response: Response) => response.json()));
  }
  updateVideo(video: Video) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.put(this._putUrl + video._id, JSON.stringify(video), options)
      .pipe(map((response: Response) => response.json()));
  }
  deleteVideo(video: Video) {
    return this._http.delete(this._deleteUrl + video._id)
      .pipe(map((response: Response) => response.json()));
  }
}
