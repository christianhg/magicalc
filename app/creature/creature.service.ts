import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import {Card} from '../card/card';
import {CardService} from '../card/card.service';
import {Creature} from './creature';

@Injectable()

export class CreatureService {
  private creaturesObservable: Observable<Creature[]>;

  constructor(private cardService: CardService) { }

  public getCreatures(): Observable<Creature[]> {
    if (!this.creaturesObservable) {
      this.creaturesObservable = this.cardService.getCards()
        .map((cards: Card[]) => {
          return _.filter(cards, (card: Card) => {
            return _.includes(card.types, 'Creature');
          });
        });
    }
    return this.creaturesObservable;
  }

  public getNoOfCreatures(): Observable<number> {
    return this.getCreatures()
      .map((creatures: Creature[]) => {
        return creatures.length;
      });
  }
}
