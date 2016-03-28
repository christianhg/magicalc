import {Component, OnInit} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS, Response} from 'angular2/http';

import {CardService} from '../card/card.service';
import {Card} from '../card/card';

import * as _ from 'lodash';

@Component({
  selector: 'magicalc',
  templateUrl: 'app/magicalc/magicalc.component.html',
  providers: [
    HTTP_PROVIDERS,
    CardService
  ]
})

export class MagicalcComponent implements OnInit {
  public title: string = 'magicalc';
  public cards: Card[];
  public cardWithLongestName: Card;
  public cardWithMostPower: Card;

  constructor(
    private cardService: CardService) { }

  public ngOnInit(): void {
    this.getCards();
    this.getCardWithMostPower();
    this.getCardWithLongestName();
  }

  public getCards(): void {
    this.cardService.getCards()
      .subscribe(
        (cards: Card[]) => {
          this.cards = cards;
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log('completed');
        }
      );
  }

  private getCardWithLongestName(): void {
    this.cardService.getCardWithLongestName()
      .subscribe(
        (card: Card) => {
          this.cardWithLongestName = card;
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log('completed');
        }
      );
  }

  private getCardWithMostPower(): void {
    this.cardService.getCardWithMostPower()
      .subscribe(
        (card: Card) => {
          this.cardWithMostPower = card;
        }
      );
  }
}
