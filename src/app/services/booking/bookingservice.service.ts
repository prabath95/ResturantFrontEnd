import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Rx';
import { environment } from '../../shared/configurations/serviceConfigurations'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BookingserviceService {

  constructor(private http:Http) { }

  bookTable(body): Observable<any> {
    console.log(body);
    return this.http.post(
      `${environment.api_url}${"booktable/new"}`,body)
    .catch(res => {
      return Observable.throw(res.json());
    })
    .map((res: Response) => res.json());
  }
}
