import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin, ILoginResponse } from '../models/auth.mode';
import { apiEndpoint } from '../constants/constants';
import {map, Observable} from 'rxjs';
import { TokenService } from './token.service';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth'
import {IResponse, ITask} from "../models/task.model";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private tokenService: TokenService, private auth: Auth) {}

  onLogin(email: any, password: any) {
    return signInWithEmailAndPassword(this.auth, email, password).then((result) => {
      if (result) {
        const tokenResult = result.user.getIdTokenResult();
          tokenResult.then((token) => {
            this.tokenService.setToken(token.token);
          })
      }
      return result;
    })
  }

  VerityUser(email: string): Observable<any> {
    return this.http.get<IResponse<ITask[]>>(
      `${apiEndpoint.UserEndpoint.getUserByEmail}/${email}`
    );
  }

  createUser(email: any, password: any) {
    return createUserWithEmailAndPassword(this.auth, email, password).then((result) => {
      return result;
    })
  }

  onLogout() {
    this.tokenService.removeToken();
  }
}
