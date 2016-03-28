import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import {Card} from './card';

@Injectable()

export class CardService {
  private cardsObservable: Observable<Card[]>;

  constructor(
    private http: Http) { }

  public getCards(): Observable<Card[]> {
    if(!this.cardsObservable) {
      this.cardsObservable = this.http.get('http://mtgjson.com/json/AllCards.json')
        .map((res: Response) => {
          return _.values(res.json());
        });
    }
    return this.cardsObservable;
  }

  public getCardWithLongestName(): Observable<Card> {
    return this.getCards()
      .map((cards: Card[]) => {
        return _.max(cards, (card: Card) => {
          return card.name.length;
        });
      });
  }

  public getCardWithMostPower(): Observable<Card> {
    return this.getCards()
      .map((cards: Card[]) => {
        return _.max(cards, (card: Card) => {
          return card.power;
        });
      });
  }

  public getCardsWithHighestCMC(): Observable<Card[]> {
    return this.getCards()
      .map((cards: Card[]) => {
        const highestCMC: number = _.max(cards, (card: Card) => {
          return card.cmc;
        }).cmc;
        return _.filter(cards, (card: Card) => {
          return card.cmc === highestCMC;
        });
      });
  }
}
