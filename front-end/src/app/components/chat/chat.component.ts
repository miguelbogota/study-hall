import { Component, OnInit, Input } from '@angular/core';
import { Chat } from 'src/app/core/models/group';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input() create = false;
  @Input() mine: boolean;
  @Input() chat: Chat;

  constructor() { }

  ngOnInit(): void {
  }

}
