import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { SigninComponent } from './views/signin/signin.component';
import { SignupComponent } from './views/signup/signup.component';
import { ProfileComponent } from './views/profile/profile.component';
import { ErrorComponent } from './views/error/error.component';
import { GroupComponent } from './views/group/group.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SubjectComponent } from './components/subject/subject.component';
import { GroupDetailsComponent } from './components/group-details/group-details.component';
import { ChatComponent } from './components/chat/chat.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    ProfileComponent,
    ErrorComponent,
    GroupComponent,
    NavbarComponent,
    SubjectComponent,
    GroupDetailsComponent,
    ChatComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
