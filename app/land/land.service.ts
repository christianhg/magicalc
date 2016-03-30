import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

import {CardService} from '../card/card.service';
import {Land} from './land';

@Injectable()

export class LandService {
  constructor(private cardService: CardService) {}

  public getLands(): Observable<Land[]> {
    return this.cardService.getCards()
      .map((lands: Land[]) => {
        return _.filter(lands, (land: Land) => {
          return _.includes(land.types, 'Land');
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