import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from "angularfire2/firestore";
import { SnackbarService } from './snackbar.service';
import { UserService } from './user.service';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
    private _user$: Observable<User>;
    private _isLoggedIn$: Observable<boolean>;
    socialLogin = new BehaviorSubject<boolean>(false);

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
        private snackBar: SnackbarService,
        private userService: UserService,
    ) {
        this._user$ = this.afAuth.authState.
            switchMap((user) => {
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    return Observable.of(null);
                }
            });

        this._isLoggedIn$ = this.afAuth.authState
            .map<firebase.User, boolean>((user: firebase.User) => {
                return user != null;
            });
    }

    login(email: string, password: string): Observable<Promise<any>> {
        this.socialLogin.next(false);
        return Observable.fromPromise(this.afAuth.auth.signInWithEmailAndPassword(email, password));
    }

    signup(user: any = {}) {
        // return Observable.fromPromise(this.afAuth.auth.createUserWithEmailAndPassword(email, password));
        return Observable.fromPromise(this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
            .then((firebaseUser) => {
                const data: User = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: user.name,
                    photoURL: user.photoURL
                };

                this.userService.update(data);
            }));
    }

    logout() {
        this.afAuth.auth.signOut()
            .then(success => { this.router.navigate(['/login']); })
            .catch(error => { this.snackBar.open('toast.serverResponse.' + error.code, 'toast.close'); });
    }

    resetPassword(email: string): Promise<any> {
        var auth = firebase.auth();
        return auth.sendPasswordResetEmail(email);
    }

    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();

        return this.oAuthLogin(provider);
    }

    facebookLogin() {
        const provider = new firebase.auth.FacebookAuthProvider();

        return this.oAuthLogin(provider);
    }

    githubLogin() {
        const provider = new firebase.auth.GithubAuthProvider();

        return this.oAuthLogin(provider);
    }

    private oAuthLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then((credential) => {
                this.socialLogin.next(true);

                const data: User = {
                    uid: credential.user.uid,
                    email: credential.additionalUserInfo.profile.email || "",
                    displayName: credential.user.displayName,
                    photoURL: credential.user.photoURL
                };

                this.userService.update(data);
            })
    }

    get user(): Observable<User> {
        return this._user$;
    }

    get isAuthenticated(): Observable<boolean> {
        return this._isLoggedIn$;
    }
}
