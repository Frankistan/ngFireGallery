import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomCovalentModule } from './modules/custom-covalent.module';
import { CustomFirebaseModule } from './modules/custom-firebase.module';
import { CustomMaterialModule } from './modules/custom-material.module';
import { CustomRecaptchaModule } from './modules/custom-recaptcha.module';
import { CustomTranslationModule } from './modules/custom-translation.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ImageCropperModule } from 'ng2-img-cropper';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
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
import { CoreService } from './shared/core.service';
import { ImageService } from './shared/image.service';
import { RecaptchaDynamicLanguageLoaderService } from './shared/recaptcha-dynamic-language-loader.service';
import { SnackbarService } from './shared/snackbar.service';
import { UploadImageService } from './shared/upload-image.service';
import { UserService } from './shared/user.service';
/* COMPONENTS */
import { EmptyGalleryComponent } from './gallery/empty-gallery/empty-gallery.component';
import { ImageDetailComponent, DeleteImageDialog } from './gallery/image-detail/image-detail.component';
import { ImageElementComponent } from './gallery/image-list/image-element/image-element.component';
import { ImageListComponent } from './gallery/image-list/image-list.component';
import { ImageUploadComponent } from './gallery/image-upload/image-upload.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileEditorComponent, UploadAvatarDialog} from './user/profile-editor/profile-editor.component';
import { ProfileInfoComponent } from './user/profile-info/profile-info.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ScrollToTopFabComponent } from './scroll-to-top-fab/scroll-to-top-fab.component';
import { SearchBarComponent } from './search/search-bar/search-bar.component';
import { SearchButtonComponent } from './search/search-button/search-button.component';
import { SettingsComponent } from './settings/settings.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SortByComponent } from './sort-by/sort-by.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { WelcomeComponent } from './welcome/welcome.component';
/* DIRECTIVES */
import { AutofocusDirective } from './shared/directives/autofocus.directive';
/* PIPES */
// import { PipesModule } from './modules/pipes.module';

@NgModule({
    declarations: [
        AppComponent,
        AutofocusDirective,
        EmptyGalleryComponent,
        ImageDetailComponent,
        ImageListComponent,
        ImageUploadComponent,
        LoginComponent,
        ProfileInfoComponent,
        ResetPasswordComponent,
        ScrollToTopFabComponent,
        SearchBarComponent,
        SearchButtonComponent,
        SettingsComponent,
        SidenavListComponent,
        SignupComponent,
        SortByComponent,
        SpinnerComponent,
        WelcomeComponent,
        ImageElementComponent,
        ProfileEditorComponent,
        UploadAvatarDialog,
        ProfileEditorComponent,
        DeleteImageDialog,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        CustomCovalentModule,
        CustomFirebaseModule,
        CustomMaterialModule,
        CustomRecaptchaModule,
        CustomTranslationModule,
        FlexLayoutModule,
        FormsModule,
        ImageCropperModule,
        LazyLoadImagesModule,
        MomentModule,
        Ng2FilterPipeModule,
        OrderModule,
        ReactiveFormsModule,
        RoutingModule,
        ScrollTrackerModule.forRoot(),
        // PipesModule,
    ],
    entryComponents: [
        UploadAvatarDialog,
        DeleteImageDialog
    ],
    providers: [
        AuthGuard,
        AuthService,
        CoreService,
        ImageService,
        LoggedInGuard,
        RecaptchaDynamicLanguageLoaderService,
        SnackbarService,
        UploadImageService,
        UserService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
