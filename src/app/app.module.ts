import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { PostCardComponent } from './components/post-card/post-card.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NewPostCardComponent } from './components/new-post-card/new-post-card.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent, PostCardComponent, UserDetailsComponent, SearchBarComponent, NewPostCardComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule, FontAwesomeModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
}
