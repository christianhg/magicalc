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
  public cardsWithHighestCMC: Card[];
  public cardsWithLongestName: Card[];
  public cardsWithMostPower: Card[];
  public cardsWithHighestPMR: Card[];
  public randomCards: Card[];

  constructor(
    private cardService: CardService) { }

  public ngOnInit(): void {
    this.getCardsWithMostPower();
    this.getCardsWithLongestName();
    this.getCardsWithHighestCMC();
    this.getCardsWithHighestPMR();
    this.getRandomCards();
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

  public getRandomCards(): void {
    this.cardService.getRandomCards()
      .subscribe(
        (cards: Card[]) => {
          this.randomCards = cards;
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log('completed');
        }
      );
  }

  private getCardsWithLongestName(): void {
    this.cardService.getCardsWithLongestName()
      .subscribe(
        (cards: Card[]) => {
          this.cardsWithLongestName = cards;
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log('completed');
        }
      );
  }

  private getCardsWithMostPower(): void {
    this.cardService.getCardsWithMostPower()
      .subscribe(
        (cards: Card[]) => {
          this.cardsWithMostPower = cards;
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log('completed');
        }
      );
  }

  private getCardsWithHighestCMC(): void {
    this.cardService.getCardsWithHighestCMC()
      .subscribe(
        (cards: Card[]) => {
          this.cardsWithHighestCMC = cards;
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log('completed');
        }
      );
  }

  private getCardsWithHighestPMR(): void {
    this.cardService.getCardsWithHighestPMR()
      .subscribe(
        (cards: Card[]) => {
          this.cardsWithHighestPMR = cards;
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log('completed');
        }
      );
  }
}
