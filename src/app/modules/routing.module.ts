import { SettingsComponent } from './../settings/settings.component';
import { ResetPasswordComponent } from './../auth/reset-password/reset-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageDetailComponent } from './../gallery/image-detail/image-detail.component';
import { ImageListComponent } from './../gallery/image-list/image-list.component';
import { ImageUploadComponent } from './../gallery/image-upload/image-upload.component';
import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from './../auth/signup/signup.component';
import { WelcomeComponent } from './../welcome/welcome.component';
import { AuthGuard } from '../guards/auth.guard';
import { LoggedInGuard } from '../guards/logged-in.guard';
import { ProfileEditorComponent } from '../user/profile-editor/profile-editor.component';

const routes: Routes = [
    {
        path: '', pathMatch: 'full', component: WelcomeComponent, data: {
            title: 'app',
            animation: {
                value: 'app',
            }
        }
    },
    {
        path: 'home', component: WelcomeComponent, data: {
            title: 'home',
            animation: {
                value: 'home',
            }
        }
    },
    {
        path: 'favorites', component: ImageListComponent, canActivate: [AuthGuard],
        data: {
            title: 'favorites',
            animation: {
                value: 'favorites',
            }
        }
    },
    {
        path: 'images', component: ImageListComponent, canActivate: [AuthGuard],
        data: {
            title: 'gallery',
            animation: {
                value: 'gallery',
            }
        }
    },
    {
        path: 'images/:id', component: ImageDetailComponent, canActivate: [AuthGuard],
        data: {
            title: 'detail',
            animation: {
                value: 'detail',
            }
        }
    },
    {
        path: 'upload', component: ImageUploadComponent, canActivate: [AuthGuard],
        data: {
            title: 'upload',
            animation: {
                value: 'upload',
            }
        }
    },
    {
        path: 'login', component: LoginComponent, canActivate: [LoggedInGuard],
        data: {
            title: 'login',
            animation: {
                value: 'login',
            }
        }
    },
    {
        path: 'signup', component: SignupComponent, canActivate: [LoggedInGuard],
        data: {
            title: 'signup',
            animation: {
                value: 'signup',
            }
        }
    },
    {
        path: 'reset-password', component: ResetPasswordComponent, canActivate: [LoggedInGuard],
        data: {
            title: 'reset_password',
            animation: {
                value: 'reset-password',
            }
        }
    },
    {
        path: 'user-profile', component: ProfileEditorComponent, canActivate: [AuthGuard],
        data: {
            title: 'profile',
            animation: {
                value: 'user-profile',
            }
        }
    },
    {
        path: 'settings', component: SettingsComponent, canActivate: [AuthGuard],
        data: {
            title: 'settings',
            animation: {
                value: 'settings',
            }
        }
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule { }
