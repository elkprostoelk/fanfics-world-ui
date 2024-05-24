import { Component, OnInit } from '@angular/core';
import {FanficDto} from "../../dto/fanficDto";
import {FanficsService} from "../../services/fanfics/fanfics.service";
import {ActivatedRoute, Router} from "@angular/router";
import {map, mergeMap, Observable} from "rxjs";
import {ConfirmationService, MessageService} from "primeng/api";
import {AuthService} from "../../services/auth/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FanficCommentService} from "../../services/fanfic-comment/fanfic-comment.service";
import {FanficCommentDto} from "../../dto/fanficCommentDto";
import {ServiceResultDto} from "../../dto/serviceResultDto";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-fanfic-page',
  templateUrl: './fanfic-page.component.html',
  styleUrls: ['./fanfic-page.component.less']
})
export class FanficPageComponent implements OnInit {
  fanfic?: FanficDto;
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
  sendCommentForm: FormGroup = this.fb.group({
    comment: ['', Validators.required]
  });
  comments: FanficCommentDto[] = [];
  commentLikeStyleClass: {[key: string]: string} = {
    'active': 'pi-thumbs-up-fill',
    'inactive': 'pi-thumbs-up'
  };
  commentDislikeStyleClass: {[key: string]: string} = {
    'active': 'pi-thumbs-down-fill',
    'inactive': 'pi-thumbs-down'
  };

  constructor(
    private readonly fanficService: FanficsService,
    private readonly fanficCommentService: FanficCommentService,
    readonly authService: AuthService,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(map(paramMap => Number(paramMap.get('id'))))
      .subscribe({
        next: id => {
          this.fanficService.getFanfic(id)
            .subscribe({
              next: fanficDto => {
                if (this.isAdultsOnly(fanficDto) && !this.authService.isAdult) {
                  this.router.navigate(['/adult-content']).then();
                }
                else {
                  this.fanfic = fanficDto;
                  this.getFanficComments();
                }
              },
              error: () => this.messageService.add({
                severity: 'error',
                summary: 'Error on getting fanfic!'
              })
            });
        }
      })
  }

  get isFanficAuthor(): Observable<boolean> {
    return this.authService.loggedInUser
      .pipe(map(user => user?.id === this.fanfic?.author.id));
  }

  isAdultsOnly(fanfic: FanficDto | undefined): boolean {
    return (fanfic?.tags.some(t => t.name.includes('(18+)')) ?? false)
      || (fanfic?.fandoms.some(f => f.title.includes('(18+)')) ?? false);
  }

  isCommentAuthor(commentAuthorId: string): Observable<boolean> {
    return this.authService.loggedInUser
      .pipe(map(user => user?.id === commentAuthorId));
  }

  onDeleteFanficClick() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this fanfic?',
      accept: () => this.deleteFanfic(this.fanfic?.id ?? 0)
    });
  }

  onDeleteCommentClick(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this comment?',
      accept: () => this.deleteComment(id)
    });
  }

  sendComment() {
    this.fanficCommentService.sendFanficComment({
      ...this.sendCommentForm.value,
      fanficId: this.fanfic?.id ?? 0
    }).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Comment has been sent successfully!',
        });
        this.sendCommentForm.reset();
        this.getFanficComments();
      },
      error: (dto: ServiceResultDto) => this.messageService.add({
        severity: 'error',
        summary: dto.errorMessage
      })
    });
  }

  onCommentLikeClick(commentId: number, currentUserReaction: boolean | null) {
    const newReaction: boolean | null = currentUserReaction === true ? null : true;
    this.setReaction(commentId, newReaction);
  }

  onCommentDislikeClick(commentId: number, currentUserReaction: boolean | null) {
    const newReaction: boolean | null = currentUserReaction === false ? null : false;
    this.setReaction(commentId, newReaction);
  }

  private deleteComment(id: number) {
    this.fanficCommentService.deleteComment(id)
      .subscribe({
        next: () => {
          this.getFanficComments();
          this.messageService.add({
            severity: 'success',
            summary: 'Comment successfully deleted!'
          });
        },
        error: (dto: ServiceResultDto) => this.messageService.add({
          severity: 'error',
          summary: dto.errorMessage ?? 'Cannot delete this comment!'
        })
      })
  }

  private setReaction(commentId: number, newReaction: boolean | null) {
    this.fanficCommentService.setReaction(commentId, newReaction)
      .subscribe({
        next: () => this.getFanficComments(),
        error: (dto: ServiceResultDto) => this.messageService.add({
          severity: 'error',
          summary: dto.errorMessage
        })
      });
  }

  private getFanficComments() {
    this.fanficCommentService.getFanficComments(this.fanfic?.id ?? 0)
      .subscribe({
        next: comments => this.comments = comments,
        error: () => this.messageService.add({
          severity: 'error',
          summary: 'Error on getting comments!'
        })
      });
  }

  private deleteFanfic(id: number) {
    this.fanficService.deleteFanfic(id)
      .subscribe({
        next: () => {
          this.messageService.add({
            summary: 'Fanfic has been deleted!',
            severity: 'success'
          });
          this.router.navigateByUrl('/');
        },
        error: () => this.messageService.add({
          summary: 'An error while deleting the fanfic!',
          severity: 'error'
        })
      });
  }
}
