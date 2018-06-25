import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { RadioButtonModule } from 'primeng/primeng';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';

import { ClientService } from '../common/_services/client.service';
import { ScheduleService } from '../common/_services/schedule.service';
import { EntryService } from '../common/_services/entry.service';
import { AuthGuard } from '../common/_guards/auth.guard';
import { AuthenticationService } from '../common/_services/authentication.service';
import { MessageService } from '../common/_services/message.service';
import { BannerService } from '../common/_services/banner.service';
import { SectionService } from '../common/_services/section.service';
import { ProductService } from '../common/_services/product.service';
import { ServiceService } from '../common/_services/service.service';
import { UserService } from '../common/_services/user.service';
import { UploadService } from '../common/_services/upload.service';

const MODULES = [
  HttpClientModule,
  RouterModule,
  BrowserModule,
  FormsModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  DataTablesModule,
  RadioButtonModule,
  AngularFireAuthModule,
  AngularFireDatabaseModule
];

const PIPES = [
  // put pipes here
];

const COMPONENTS = [
  // put shared components here
];

const SERVICES = [
  ClientService,
  ScheduleService,
  AuthGuard,
  EntryService,
  AuthenticationService,
  MessageService,
  BannerService,
  SectionService,
  ServiceService,
  ProductService,
  UserService,
  UploadService
];

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [
    ...PIPES,
    ...COMPONENTS
  ],
  providers: [
    ...SERVICES
  ],
  exports: [
    ...MODULES,
    ...PIPES,
    ...COMPONENTS
  ]
})
export class CommonModule { }
