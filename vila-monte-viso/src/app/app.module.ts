import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from './common/common.module';
import { HomeModule } from './home/home.module';
import { AppRouting } from './app.routing';
import { LoginModule } from './login/login.module';
import { MessageModule } from './message/message.module';
import { ClientModule } from './client/client.module';
import { ScheduleModule } from './schedule/schedule.module';
import { YearlyReportModule } from './yearly-report/yearly-report.module';
import { MonthlyReportModule } from './monthly-report/monthly-report.module';
import { ReportModule } from './report/report.module';
import { BannerModule } from './banner/banner.module';
import { SectionModule } from './section/section.module';
import { ProductModule } from './product/product.module';
import { ServiceModule } from './service/service.module';
import { NoContentModule } from './no-content/no-content.module';
import { UserModule } from './user/user.module';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import * as $ from 'jquery';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    CommonModule,
    AppRouting,
    HomeModule,
    ClientModule,
    ScheduleModule,
    YearlyReportModule,
    MonthlyReportModule,
    ReportModule,
    LoginModule,
    MessageModule,
    BannerModule,
    SectionModule,
    ProductModule,
    ServiceModule,
    NoContentModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebase),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
  ]
})

export class AppModule { }
