import {CanActivateFn, Router} from '@angular/router';
import {Auth} from "@angular/fire/auth";
import {inject} from "@angular/core";

export const authGuardGuard: CanActivateFn = (route, state) => {
    const auth = inject(Auth)
    const router = inject(Router);

    if (auth.currentUser?.email) {
        console.log('Puede pasar: ' + auth.currentUser.email);
        return true;
    }

    console.log('No puede pasar.');
    router.navigateByUrl('error');
    return false;
};