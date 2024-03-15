import { Component, Input } from '@angular/core';
import {DatePipe, NgIf} from "@angular/common";
import {SimpleFanficDto} from "../../../dto/simpleFanficDto";
import {FanficsService} from "../../../services/fanfics/fanfics.service";
import {TagService} from "../../../services/tag/tag.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-fanfic-item',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    RouterLink
  ],
  templateUrl: './fanfic-item.component.html',
  styleUrl: './fanfic-item.component.less'
})
export class FanficItemComponent {
  @Input()
  fanfic?: SimpleFanficDto;

  constructor(
    readonly fanficsService: FanficsService,
    readonly tagsService: TagService) { }

  getCoauthorsNames(fanfic: SimpleFanficDto): string {
    return fanfic.coauthors?.map(author => author.userName)
      .join(', ') ?? 'not specified';
  }
}
