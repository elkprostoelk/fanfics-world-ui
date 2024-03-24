import {Component, Input} from '@angular/core';
import {TagModule} from "primeng/tag";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-fanfics-world-tag',
  standalone: true,
  imports: [
    TagModule,
    NgIf
  ],
  templateUrl: './fanfics-world-tag.component.html',
  styleUrl: './fanfics-world-tag.component.less'
})
export class FanficsWorldTagComponent {
  @Input()
  value?: string;
  @Input()
  color?: string;
  @Input()
  severity?: "success" | "info" | "warning" | "danger" | string;
  @Input()
  textColor?: string;
  @Input()
  icon?: string;
}
