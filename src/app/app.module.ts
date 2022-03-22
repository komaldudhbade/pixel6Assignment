import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VerifyComponent } from './component/verify/verify.component';
import { VerifyUserService } from './services/verify-user.service';

@NgModule({
  declarations: [AppComponent, VerifyComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [VerifyUserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
