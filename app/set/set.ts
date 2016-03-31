import {Card} from '../card/card';

export interface Set {
  booster?: string[];
  border: string;
  cards: Card[];
  code: string;
  gathererCode?: string;
  magicCardsInfoCode: string;
  magicRaritiesCodes?: string[];
  mkm_id?: number;
  mkm_name?: string;
  name: string;
  releaseData: string;
  translations?: Object;
  type: string;
}
