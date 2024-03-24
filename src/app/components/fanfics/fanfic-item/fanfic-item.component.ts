import { Component, Input } from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {SimpleFanficDto} from "../../../dto/simpleFanficDto";
import {FanficsService} from "../../../services/fanfics/fanfics.service";
import {TagService} from "../../../services/tag/tag.service";
import {RouterLink} from "@angular/router";
import {TagModule} from "primeng/tag";
import {PrimeIcons} from "primeng/api";
import {TooltipModule} from "primeng/tooltip";
import {FanficsWorldTagComponent} from "../../fanfics-world-tag/fanfics-world-tag.component";

@Component({
  selector: 'app-fanfic-item',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    RouterLink,
    NgForOf,
    TagModule,
    TooltipModule,
    FanficsWorldTagComponent
  ],
  templateUrl: './fanfic-item.component.html',
  styleUrl: './fanfic-item.component.less'
})
export class FanficItemComponent {
  @Input()
  fanfic?: SimpleFanficDto;
  readonly fanficStatusTagIcon: {[key: string]: string} = {
    'In progress': 'caret-right',
    'Finished': 'check',
    'Frozen': 'pause'
  };
  readonly fanficStatusTagColor: {[key: string]: string} = {
    'In progress': '',
    'Finished': 'green',
    'Frozen': 'cyan'
  };
  readonly fanficOriginTagIcon: {[key: string]: string} = {
    'Original Text': 'align-justify',
    'Translation': 'globe'
  };
  readonly fanficRatingTagColor: {[key: string]: string} = {
    'G': 'green',
    'PG-13': 'lightgreen',
    'R': 'gold',
    'NC-17': 'darkorange',
    'NC-21': 'darkred'
  };
  readonly fanficDirectionTagColor: {[key: string]: string} = {
    'Gen': 'brown',
    'Het': 'green',
    'Slash': 'darkturquoise',
    'Femslash': 'purple',
    'Other': 'darkgreen',
    'Mixed': 'gold',
    'Article': 'gray'
  };

  constructor(
    readonly fanficsService: FanficsService,
    readonly tagsService: TagService) { }

  getCoauthorsNames(fanfic: SimpleFanficDto): string {
    return fanfic.coauthors?.map(author => author.userName)
      .join(', ') ?? 'not specified';
  }

  protected readonly PrimeIcons = PrimeIcons;
}
