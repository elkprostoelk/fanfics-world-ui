import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
import {FandomService} from "../../../../services/fandom/fandom.service";
import {ButtonModule} from "primeng/button";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-add-new-fandom',
  standalone: true,
  imports: [
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  templateUrl: './add-new-fandom.component.html',
  styleUrl: './add-new-fandom.component.less'
})
export class AddNewFandomComponent implements OnInit {
  @Input() dialogVisible: boolean = false;
  @Output() dialogVisibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output() onFandomAdded: EventEmitter<any> = new EventEmitter();
  addNewFandomForm: UntypedFormGroup = this.fb.group({
    title: ['', Validators.required]
  });

  constructor(private readonly fb: FormBuilder,
              private readonly fandomService: FandomService,
              private readonly messageService: MessageService) {}

  ngOnInit() {}

  onDialogHide() {
    this.dialogVisible = false;
    this.dialogVisibleChange.emit(this.dialogVisible);
  }

  addNewFandom() {
    this.fandomService.addNewFandom(this.addNewFandomForm.value)
      .subscribe({
        next: () => {
          this.addNewFandomForm.reset();
          this.messageService.add({
            severity: 'success',
            summary: 'Successfully added a fandom!'
          });
          this.onDialogHide();
          this.onFandomAdded.emit();
        },
        error: () => this.messageService.add({
          severity: 'error',
          summary: 'Failed to add a fandom!'
        })
      });
  }
}
