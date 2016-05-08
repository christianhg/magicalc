import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import {Card} from '../card/card';
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

  public getNoOfMythicRares(): Observable<number> {
    return this.getCards()
      .map((cards: Card[]) => {
        return _.filter(cards, (card, Card) => {
          return card.rarity ? card.rarity == 'Mythic Rare' : false;
        });
      })
      .map((cards: Card[]) => {
        return cards.length;
      });
  }

  private getCards(): Observable<Card[]> {
    return this.getSets()
      .map((sets: Set[]) => {
        let cards: Card[] = [];
        _.forEach(sets, (set: Set) => {
          cards = cards.concat(set.cards);
        });
        return cards;
      });
  }
}
