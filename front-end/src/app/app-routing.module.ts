import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ErrorComponent } from './views/error/error.component';
import { SigninComponent } from './views/signin/signin.component';
import { SignupComponent } from './views/signup/signup.component';
import { ProfileComponent } from './views/profile/profile.component';
import { GroupComponent } from './views/group/group.component';
import { ClassesComponent } from './views/classes/classes.component';
import { SignedInGuard } from 'src/app/core/guards/signed-in.guard';
import { SignedOutGuard } from 'src/app/core/guards/signed-out.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent, canActivate: [SignedOutGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [SignedOutGuard] },
  { path: 'profile/:userId', component: ProfileComponent },
  { path: 'group/:groupId', component: GroupComponent, canActivate: [SignedInGuard] },
  { path: 'classes', component: ClassesComponent, canActivate: [SignedInGuard] },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
