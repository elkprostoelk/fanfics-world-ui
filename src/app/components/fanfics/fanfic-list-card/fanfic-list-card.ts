import {Component, Input, OnInit} from '@angular/core';
import {Card} from 'primeng/card';
import {DatePipe} from '@angular/common';
import {FanficListItem} from '../../../models/fanfics/fanficListItem';
import {LookupsService} from '../../../services/lookups/lookups.service';

@Component({
  selector: 'app-fanfic-list-card',
  imports: [
    Card,
    DatePipe
  ],
  templateUrl: './fanfic-list-card.html',
  styleUrl: './fanfic-list-card.less'
})
export class FanficListCard implements OnInit {
  @Input() fanfic!: FanficListItem;
  fanficDirection = '';
  fanficRating = '';
  fanficStatus = '';

  constructor(
    private readonly lookupsService: LookupsService) {}

  ngOnInit() {
    this.fanficDirection = this.lookupsService.directions
      .find(d => d.key === this.fanfic.direction)?.value ?? '';
    this.fanficRating = this.lookupsService.ratings
      .find(d => d.key === this.fanfic.rating)?.value ?? '';
    this.fanficStatus = this.lookupsService.statuses
      .find(d => d.key === this.fanfic.status)?.value ?? '';
  }
}
