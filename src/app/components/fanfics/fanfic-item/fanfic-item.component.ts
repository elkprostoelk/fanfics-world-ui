import { Component, Input } from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {SimpleFanficDto} from "../../../dto/simpleFanficDto";
import {FanficsService} from "../../../services/fanfics/fanfics.service";
import {TagService} from "../../../services/tag/tag.service";
import {RouterLink} from "@angular/router";
import {TagModule} from "primeng/tag";
import {AuthorTagComponent} from "../../author-tag/author-tag.component";
import {PrimeIcons} from "primeng/api";
import {TooltipModule} from "primeng/tooltip";

@Component({
  selector: 'app-fanfic-item',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    RouterLink,
    NgForOf,
    TagModule,
    AuthorTagComponent,
    TooltipModule
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

  protected readonly Array = Array;
  protected readonly PrimeIcons = PrimeIcons;
}
