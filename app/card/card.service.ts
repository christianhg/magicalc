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

  public getCardsWithLongestName(): Observable<Card[]> {
    return this.getCards()
      .map((cards: Card[]) => {
        return _.sortByOrder(cards, (card: Card) => {
          return card.name.length;
        }, 'desc');
      })
      .map((cards: Card[]) => {
        return _.slice(cards, 0, 10);
      });
  }

  public getCardsWithMostPower(): Observable<Card[]> {
    return this.getCards()
      .map((cards: Card[]) => {
        return _.sortByOrder(cards, (card: Card) => {
          const power: number = parseInt(card.power);
          if (power && !isNaN(power)) {
            return card.power;
          }
          return false;
        }, 'desc');
      })
      .map((cards: Card[]) => {
        return _.slice(cards, 0, 10);
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

  public getCardsWithHighestPMR(): Observable<Card[]> {
    return this.getCards()
      .map((cards: Card[]) => {
        return _.filter(cards, (card: Card) => {
          const power: number = parseInt(card.power);
          if (power && card.cmc && !isNaN(power)) {
            if (card.cmc > 0 && power > 0) {
              card.pmr = power / card.cmc;
            }
            else {
              card.pmr = power;
            }
            return true;
          }
          return false;
        });
      })
      .map((cards: Card[]) => {
        return _.sortByOrder(cards, (card: Card) => {
          return card.pmr;
        }, 'desc');
      })
      .map((cards: Card[]) => {
        return _.slice(cards, 0, 10);
      });
  }
}
