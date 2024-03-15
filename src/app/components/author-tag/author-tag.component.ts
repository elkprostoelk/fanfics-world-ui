import {Component, Input} from '@angular/core';
import {PrimeIcons, SharedModule} from "primeng/api";
import {TagModule} from "primeng/tag";
import {SimpleUserDto} from "../../dto/simpleUserDto";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-author-tag',
  standalone: true,
  imports: [
    SharedModule,
    TagModule,
    NgIf
  ],
  templateUrl: './author-tag.component.html',
  styleUrl: './author-tag.component.less'
})
export class AuthorTagComponent {
  @Input()
  author?: SimpleUserDto;
}
