import {Injectable} from '@angular/core';
import {FanficDirection} from '../../models/fanfics/fanficDirection';
import {FanficRating} from '../../models/fanfics/fanficRating';
import {FanficStatus} from '../../models/fanfics/fanficStatus';

@Injectable({
  providedIn: 'root'
})
export class LookupsService {
  public readonly directions: { key: FanficDirection, value: string }[] = [
    { key: FanficDirection.NotDefined, value: 'Not Defined'},
    { key: FanficDirection.Gen, value: 'Gen'},
    { key: FanficDirection.Het, value: 'Het'},
    { key: FanficDirection.Slash, value: 'Slash'},
    { key: FanficDirection.Femslash, value: 'Femslash'},
    { key: FanficDirection.Other, value: 'Other'},
    { key: FanficDirection.Mixed, value: 'Mixed'},
    { key: FanficDirection.Article, value: 'Article'},
  ];
  public readonly ratings: { key: FanficRating, value: string }[] = [
    { key: FanficRating.G, value: 'G'},
    { key: FanficRating.Pg13, value: 'PG-13'},
    { key: FanficRating.R, value: 'R'},
    { key: FanficRating.Nc17, value: 'NC-17'},
    { key: FanficRating.Nc21, value: 'NC-21'},
  ];
  public readonly statuses: { key: FanficStatus, value: string }[] = [
    { key: FanficStatus.InProgress, value: 'In Progress' },
    { key: FanficStatus.Finished, value: 'Finished' },
    { key: FanficStatus.Frozen, value: 'Frozen' },
  ];
}
