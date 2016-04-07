import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

import {Card} from '../card/card';
import {CardService} from '../card/card.service';
import {Sorcery} from './sorcery';

@Injectable()

export class SorceryService {
  private sorceriesObservable: Observable<Sorcery[]>;

  constructor(private cardService: CardService) { }

  public getSorceries(): Observable<Sorcery[]> {
    if (!this.sorceriesObservable) {
      this.sorceriesObservable = this.cardService.getCards()
        .map((cards: Card[]) => {
          return _.filter(cards, (card: Card) => {
            return _.includes(card.types, 'Sorcery');
          });
        });
    }
    return this.sorceriesObservable;
  }

  public getNoOfSorceries(): Observable<number> {
    return this.getSorceries()
      .map((sorceries: Sorcery[]) => {
        return sorceries.length;
      });
  }
}
