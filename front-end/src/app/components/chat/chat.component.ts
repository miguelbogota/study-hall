import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Chat, Group } from 'src/app/core/models/group';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { GroupService } from 'src/app/core/services/group/group.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input() create = false;
  @Input() chat: Chat;
  @Input() group: Group;

  @Output() update: EventEmitter<boolean> = new EventEmitter();
  
  mine: boolean;
  user: User = null;
  textMessageForm: FormGroup;

  constructor(
    private auth: AuthService,
    private userS: UserService,
    private groupS: GroupService,
    private fb: FormBuilder
  ) {
    this.textMessageForm = this.fb.group({
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userS.getUser(this.auth.authState.username).subscribe(u => {
      this.user = u;
    })
    this.auth.authStateChanges.subscribe(u => {
      if (this.chat) {
        this.mine = u.username === this.chat.personId;
      }
    });
  }

  sendMessage() {
    this.groupS.sendChat(this.group.code, {
      personId: this.auth.authState.username,
      isModerator: this.user.type === 'teacher',
      text: this.message.value
    } as Chat).subscribe(u => {
      if (u) {
        this.update.emit(true);
      }
    });
    this.message.reset();
  }

  get message(): AbstractControl { return this.textMessageForm.get('message'); }

}
