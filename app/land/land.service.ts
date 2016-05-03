import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import {Card} from '../card/card';
import {CardService} from '../card/card.service';
import {Land} from './land';

@Injectable()

export class LandService {
  constructor(private cardService: CardService) {}

  public getLands(): Observable<Land[]> {
    return this.cardService.getCards()
      .map((cards: Card[]) => {
        return _.filter(cards, (card: Card) => {
          return _.includes(card.types, 'Land');
        });
      });
  }

  public getLandsWithMostColorIdentities(): Observable<Land[]> {
    return this.getLands()
      .map((lands: Land[]) => {
        return _.sortByOrder(lands, (land: Land) => {
          return _.size(land.colorIdentity);
        }, 'desc');
      })
      .map((lands: Land[]) => {
        return _.slice(lands, 0, 10);
      });
  }
}
