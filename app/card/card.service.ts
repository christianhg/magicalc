import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import {Card} from './card';

@Injectable()

export class CardService {
  private cards: Card[];

  constructor(
    private http: Http) { }

  public getCards(): Observable<Card[]> {
    if (!this.cards) {
      return this.http.get('http://mtgjson.com/json/AllCards.json')
        .map((res: Response) => {
          this.cards = <Card[]>_.values(res.json());
          return this.cards;
        });
    }
    return Observable.of(this.cards);
  }

  public getRandomCards(): Observable<Card[]> {
    return this.getCards()
      .map((cards: Card[]) => {
        return _.sample(cards, 10);
      });
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

  public getCardsWithMostText(): Observable<Card[]> {
    return this.getCards()
      .map((cards: Card[]) => {
        return _.sortByOrder(cards, (card: Card) => {
          return card.text ? card.text.length : false;
        }, 'desc');
      })
      .map((cards: Card[]) => {
        return _.slice(cards, 0, 10);
      });
  }

  public getCardsWithLeastText(): Observable<Card[]> {
    return this.getCards()
      .map((cards: Card[]) => {
        return _.filter(cards, (card: Card) => {
          return !_.isEmpty(card.text);
        });
      })
      .map((cards: Card[]) => {
        return _.sortByOrder(cards, (card: Card) => {
          return card.text.length;
        }, 'asc');
      })
      .map((cards: Card[]) => {
        console.log(cards);
        return _.slice(cards, 0, 10);
      });
  }

  public getCardsWithMostPower(): Observable<Card[]> {
    return this.getCards()
      .map((cards: Card[]) => {
        return _.sortByOrder(cards, (card: Card) => {
          const power: number = parseInt(card.power);
          if (power && !isNaN(power)) {
            return power;
          }
          return false;
        }, 'desc');
      })
      .map((cards: Card[]) => {
        return _.slice(cards, 0, 10);
      });
  }

  public getCardsWithMostToughness(): Observable<Card[]> {
    return this.getCards()
      .map((cards: Card[]) => {
        return _.sortByOrder(cards, (card: Card) => {
          const toughness: number = parseInt(card.toughness);
          if (toughness && !isNaN(toughness)) {
            return toughness;
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
        return _.sortByOrder(cards, (card: Card) => {
          if (card.cmc > 0) {
            return card.cmc;
          }
          return false;
        }, 'desc');
      })
      .map((cards: Card[]) => {
        return _.slice(cards, 0, 10);
      });
  }

  public getCardsWithMostTypes(): Observable<Card[]> {
    return this.getCards()
      .map((cards: Card[]) => {
        return _.sortByOrder(cards, (card: Card) => {
          return _.size(card.types);
        }, 'desc');
      })
      .map((cards: Card[]) => {
        console.log(cards);
        return _.slice(cards, 0, 10);
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
