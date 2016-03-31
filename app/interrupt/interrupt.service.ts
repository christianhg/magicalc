import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

import {Card} from '../card/card';
import {CardService} from '../card/card.service';
import {Interrupt} from './interrupt';

@Injectable()

export class InterruptService {
  constructor(private cardService: CardService) {}

  /**
   * TODO: Currently returns no Interrupts. Fix this.
   */
  public getInterrupts(): Observable<Interrupt[]> {
    return this.cardService.getCards()
      .map((cards: Card[]) => {
        return _.filter(cards, (card: Card) => {
          return _.includes(card.types, 'Interrupt');
        });
      });
  }
}
