import {Component, OnInit} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS, Response} from 'angular2/http';

import {CardService} from '../card/card.service';
import {Card} from '../card/card';

import {LandService} from '../land/land.service';
import {Land} from '../land/land';

import * as _ from 'lodash';

@Component({
  selector: 'magicalc',
  templateUrl: 'app/magicalc/magicalc.component.html',
  providers: [
    HTTP_PROVIDERS,
    CardService,
    LandService
  ]
})

export class MagicalcComponent implements OnInit {
  public title: string = 'magicalc';
  public cards: Card[];
  public cardsWithHighestCMC: Card[];
  public cardsWithLongestName: Card[];
  public cardsWithMostText: Card[];
  public cardsWithMostPower: Card[];
  public cardsWithHighestPMR: Card[];
  public randomCards: Card[];
  public landsWithMostColorIdentities: Land[];

  constructor(
    private cardService: CardService,
    private landService: LandService) { }

  public ngOnInit(): void {
    this.getCardsWithMostPower();
    this.getCardsWithLongestName();
    this.getCardsWithMostText();
    this.getCardsWithHighestCMC();
    this.getCardsWithHighestPMR();
    this.getRandomCards();
    this.getLandsWithMostColorIdentities();
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

  private getCardsWithMostText(): void {
    this.cardService.getCardsWithMostText()
      .subscribe(
        (cards: Card[]) => {
          this.cardsWithMostText = cards;
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

  private getLandsWithMostColorIdentities(): void {
    this.landService.getLandsWithMostColorIdentities()
      .subscribe(
        (lands: Land[]) => {
          this.landsWithMostColorIdentities = lands;
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
