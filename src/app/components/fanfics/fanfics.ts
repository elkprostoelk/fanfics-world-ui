import {Component, OnInit} from '@angular/core';
import {FanficService} from '../../services/fanfic/fanfic.service';
import {FanficsSearchCriteria} from '../../models/fanfics/fanficsSearchCriteria';
import {MessageService} from 'primeng/api';
import {ProgressSpinner} from 'primeng/progressspinner';
import {FanficListItem} from '../../models/fanfics/fanficListItem';
import {FanficListCard} from './fanfic-list-card/fanfic-list-card';

@Component({
  selector: 'app-fanfics',
  imports: [
    ProgressSpinner,
    FanficListCard,
  ],
  templateUrl: './fanfics.html',
  styleUrl: './fanfics.less'
})
export class Fanfics implements OnInit {
  isLoading = false;
  fanfics: FanficListItem[] = [];

  constructor(
    private readonly fanficService: FanficService,
    private readonly messageService: MessageService) {}

  ngOnInit() {
    this.performFanficsSearch(new FanficsSearchCriteria());
  }

  private performFanficsSearch(searchCriteria: FanficsSearchCriteria) {
    this.isLoading = true;
    this.fanficService.searchForFanfics(searchCriteria)
      .subscribe({
        next: result => {
          this.isLoading = false;
          this.fanfics = result.items;
          this.fanficService.fanficsSearchCriteria$.next(searchCriteria);
        },
        error: err => {
          this.isLoading = false;
          this.fanfics = [];
          this.messageService.add({
            severity: 'error',
            summary: 'Something went wrong',
            detail: 'Failed to search for fanfics. Unexpected error occurred.'
          });
        }
      });
  }
}
