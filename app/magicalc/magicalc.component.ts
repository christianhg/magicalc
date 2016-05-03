import {Component, OnInit} from '@angular/core';
import {NgClass} from '@angular/common';
import {Http, Headers, HTTP_PROVIDERS, Response} from '@angular/http';

import {CardService} from '../card/card.service';
import {Card} from '../card/card';

import {CreatureService} from '../creature/creature.service';
import {Creature} from '../creature/creature';

import {LandService} from '../land/land.service';
import {Land} from '../land/land';

import {SetService} from '../set/set.service';
import {Set} from '../set/set';

import {SorceryService} from '../sorcery/sorcery.service';
import {Sorcery} from '../sorcery/sorcery';

import {SearchComponent} from '../search/search.component';

import * as _ from 'lodash';

@Component({
  selector: 'magicalc',
  templateUrl: 'app/magicalc/magicalc.component.html',
  providers: [
    HTTP_PROVIDERS,
    CardService,
    CreatureService,
    LandService,
    SetService,
    SorceryService
  ],
  directives: [
    NgClass,
    SearchComponent
  ]
})

export class MagicalcComponent implements OnInit {
  public title: string = 'magicalc';
  public cards: Card[];
  public cardsWithHighestCMC: Card[];
  public cardsWithLongestName: Card[];
  public cardsWithMostText: Card[];
  public cardsWithMostPower: Card[];
  public cardsWithMostTypes: Card[];
  public cardsWithHighestPMR: Card[];
  public randomCards: Card[];
  public landsWithMostColorIdentities: Land[];
  public noOfCreatures: number;
  public noOfSorceries: number;
  public noOfSets: number;

  constructor(
    private cardService: CardService,
    private creatureService: CreatureService,
    private landService: LandService,
    private setService: SetService,
    private sorceryService: SorceryService) { }

  public ngOnInit(): void {

  }

  private getNoOfCreatures(): void {
    if (!this.noOfCreatures) {
      this.creatureService.getNoOfCreatures()
        .subscribe(
          (count: number) => {
            this.noOfCreatures = count;
          },
          (error) => {
            console.log(error);
          },
          () => {
            console.log('Completed counting no. of Creatures');
          }
        );
    }
  }

  private getNoOfSets(): void {
    if (!this.noOfSets) {
      this.setService.getNoOfSets()
        .subscribe(
          (count: number) => {
            this.noOfSets = count;
          },
          (error) => {
            console.log(error);
          },
          () => {
            console.log('Completed counting no. of Sets');
          }
        );
    }
  }

  private getNoOfSorceries(): void {
    if (!this.noOfSorceries) {
      this.sorceryService.getNoOfSorceries()
        .subscribe(
          (count: number) => {
            this.noOfSorceries = count;
          },
          (error) => {
            console.log(error);
          },
          () => {
            console.log('Completed counting no. of Sorceries');
          }
        );
    }
  }

  private getCards(): void {
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
    if (!this.randomCards) {
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
  }

  public getCardsWithLongestName(): void {
    if (!this.cardsWithLongestName) {
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
  }

  public getCardsWithMostText(): void {
    if (!this.cardsWithMostText) {
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
  }

  public getCardsWithMostPower(): void {
    if (!this.cardsWithMostPower) {
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
  }

  public getCardsWithMostTypes(): void {
    if (!this.cardsWithMostTypes) {
      this.cardService.getCardsWithMostTypes()
        .subscribe(
          (cards: Card[]) => {
            this.cardsWithMostTypes = cards;
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


  public getCardsWithHighestCMC(): void {
    if (!this.cardsWithHighestCMC) {
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
  }

  public getCardsWithHighestPMR(): void {
    if (!this.cardsWithHighestPMR) {
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

  public getLandsWithMostColorIdentities(): void {
    if (!this.landsWithMostColorIdentities) {
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
}
