import { Component, OnInit } from '@angular/core';
import { Group } from '../../core/models/group';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { GroupService } from '../../core/services/group/group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  trustedUrl: SafeUrl = null;
  groupCode: string = null;
  isLoading = true;
  videoInputForm: FormGroup;

  sub: Subscription;

  group: Group = null;

  constructor(
    private sanitizer: DomSanitizer,
    private groupS: GroupService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.videoInputForm = this.fb.group({
      video: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(u => {
      this.groupCode = u.get('groupId');
      this.sub = this.groupS.getGroup(this.groupCode).subscribe(u => {
        if (u) {
          this.group = u;
          this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.group.videoUrl);
          this.isLoading = false;
        }
        else {
          this.router.navigate(['/']);
        }
      });
    })
  }

  onUpdate() {
    this.sub = this.groupS.getGroup(this.groupCode).subscribe(u => {
      if (u) {
        this.group = u;
      }
    })
  }

  sendVideo() {
    this.groupS.updateGroup(this.group.code, {
      videoUrl: this.video.value
    } as Group).subscribe(u => {
      this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + u.videoUrl);
    })
  }

  get video(): AbstractControl { return this.videoInputForm.get('video'); }

}
