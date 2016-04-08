import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import {Set} from './set';

@Injectable()

export class SetService {
  private setsObservable: Observable<Set[]>;

  constructor(
    private http: Http) { }

  public getSets(): Observable<Set[]> {
    if(!this.setsObservable) {
      this.setsObservable = this.http.get('http://mtgjson.com/json/AllSetsArray-x.json')
        .map((res: Response) => {
          return res.json();
        });
    }
    return this.setsObservable;
  }

  public getNoOfSets(): Observable<number> {
    return this.getSets()
      .map((sets: Set[]) => {
        return sets.length;
      });
  }
}
