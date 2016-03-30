import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

import {Card} from '../card/card';
import {CardService} from '../card/card.service';
import {Sorcery} from './sorcery';

@Injectable()

export class SorceryService {
  constructor(private cardService: CardService) { }

  private getSorceries(): Observable<Sorcery[]> {
    return this.cardService.getCards()
      .map((cards: Card[]) => {
        return _.filter(cards, (card: Card) => {
          return _.includes(card.types, 'Sorcery');
        });
      });
  }
}
