import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {MessageService} from "primeng/api";
import {TagService} from "../../../../services/tag/tag.service";

@Component({
  selector: 'app-add-new-tag',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-new-tag.component.html',
  styleUrl: './add-new-tag.component.less'
})
export class AddNewTagComponent {
  @Input() dialogVisible: boolean = false;
  @Output() dialogVisibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output() onTagAdded: EventEmitter<any> = new EventEmitter();
  addNewTagForm: UntypedFormGroup = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(private readonly fb: FormBuilder,
              private readonly tagService: TagService,
              private readonly messageService: MessageService) {}

  ngOnInit() {}

  onDialogHide() {
    this.dialogVisible = false;
    this.dialogVisibleChange.emit(this.dialogVisible);
  }

  addNewTag() {
    this.tagService.addNewTag(this.addNewTagForm.value)
      .subscribe({
        next: () => {
          this.addNewTagForm.reset();
          this.messageService.add({
            severity: 'success',
            summary: 'Successfully added a tag!'
          });
          this.onDialogHide();
          this.onTagAdded.emit();
        },
        error: () => this.messageService.add({
          severity: 'error',
          summary: 'Failed to add a tag!'
        })
      });
  }
}
