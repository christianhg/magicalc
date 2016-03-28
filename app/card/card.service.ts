import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import {Card} from './card';

@Injectable()

export class CardService {
  constructor(
    private http: Http) { }

  public getCards(): Observable<Card[]> {
    return this.http.get('http://mtgjson.com/json/AllCards.json')
      .map((res: Response) => {
        return _.values(res.json());
      });
  }

  public getCardWithMostPower(): Observable<Card> {
    return this.http.get('http://mtgjson.com/json/AllCards.json')
      .map((res: Response) => {
        return _.values(res.json());
      })
      .map((cards: Card[]) => {
        return _.max(cards, (card: Card) => {
          return card.power;
        });
      });
  }
}
