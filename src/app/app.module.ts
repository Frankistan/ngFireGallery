import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomCovalentModule } from './modules/custom-covalent.module';
import { CustomFirebaseModule } from './modules/custom-firebase.module';
import { CustomMaterialModule } from './modules/custom-material.module';
import { CustomRecaptchaModule } from './modules/custom-recaptcha.module';
import { CustomTranslationModule } from './modules/custom-translation.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MomentModule } from 'angular2-moment';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { OrderModule } from 'ngx-order-pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RoutingModule } from './modules/routing.module';
import { ScrollTrackerModule } from '@nicky-lenaers/ngx-scroll-tracker';
import { AppComponent } from './app.component';
/* GUARDS */
import { AuthGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
/* SERVICES */
import { AuthService } from './shared/auth.service';
import { ImageService } from './shared/image.service';
import { SetTitleOnRouteChangeService } from './shared/set-title-on-route-change.service';
import { SnackbarService } from './shared/snackbar.service';
import { SpinnerService } from './shared/spinner.service';
import { ToolbarService } from './shared/toolbar.service';
import { UploadImageService } from './shared/upload-image.service';
import { UserService } from './shared/user.service';
/* COMPONENTS */
import { DeleteImageDialogComponent } from './dialogs/delete-image-dialog/delete-image-dialog.component';
import { EmptyGalleryComponent } from './gallery/empty-gallery/empty-gallery.component';
import { ImageDetailComponent } from './gallery/image-detail/image-detail.component';
import { ImageListComponent } from './gallery/image-list/image-list.component';
import { ImageUploadComponent } from './gallery/image-upload/image-upload.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileDetailsComponent } from './user/profile-details/profile-details.component';
import { ProfileInfoComponent } from './user/profile-info/profile-info.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { SearchBarComponent } from './search/search-bar/search-bar.component';
import { SearchButtonComponent } from './search/search-button/search-button.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SortByComponent } from './sort-by/sort-by.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { WelcomeComponent } from './welcome/welcome.component';
/* DIRECTIVES */
import { AutofocusDirective } from './shared/directives/autofocus.directive';
import { SettingsComponent } from './settings/settings.component';
import { ScrollService } from './shared/scroll.service';
/* PIPES */
// import { PipesModule } from './modules/pipes.module';

@NgModule({
    declarations: [
        AppComponent,
        AutofocusDirective,
        DeleteImageDialogComponent,
        ImageDetailComponent,
        ImageListComponent,
        ImageUploadComponent,
        LoginComponent,
        ProfileDetailsComponent,
        ProfileInfoComponent,
        ResetPasswordComponent,
        SidenavListComponent,
        SignupComponent,
        WelcomeComponent,
        SortByComponent,
        SearchButtonComponent,
        SearchBarComponent,
        SpinnerComponent,
        EmptyGalleryComponent,
        SettingsComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CustomCovalentModule,
        CustomFirebaseModule,
        CustomMaterialModule,
        CustomRecaptchaModule,
        CustomTranslationModule,
        FlexLayoutModule,
        FormsModule,
        MomentModule,
        Ng2FilterPipeModule,
        OrderModule,
        ReactiveFormsModule,
        RoutingModule,
        ScrollTrackerModule.forRoot(),
        // PipesModule,
    ],
    entryComponents: [
        DeleteImageDialogComponent
    ],
    providers: [
        AuthGuard,
        AuthService,
        ImageService,
        LoggedInGuard,
        SetTitleOnRouteChangeService,
        SnackbarService,
        ToolbarService,
        UploadImageService,
        UserService,
        SpinnerService,
        ScrollService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
