import { Component, OnInit } from '@angular/core';
import { Group } from '../../core/models/group';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  trustedUrl: SafeUrl = null;

  group: Group = {
    code: 'C456',
    videoUrl: 'a1EYvKFGJOE',
    topic: 'Ingles',
    schedule: {
      date: new Date(),
      in: new Date(),
      out: new Date()
    },
    chats: [
      {
        personId: '345678',
        text: 'Hola!',
        createdAt: new Date(),
        isModerator: true
      }
    ]
  };

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.group.videoUrl);
  }

}
