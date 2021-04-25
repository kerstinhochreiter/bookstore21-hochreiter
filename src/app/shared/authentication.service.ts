import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import jwt_decode from "jwt-decode";

interface Token {
  exp: number;
  user: {
    id: string;
  };
}
@Injectable()
export class AuthenticationService {
  private api: string =
    "https://bookstore21.s1810456014.student.kwmhgb.at/api/auth";

  constructor(private http: HttpClient) {}

  //später noch: isadmin
  login(email: string, password: string) {
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }

  public setLocalStorage(token: string) {
    localStorage.setItem("token", token);
    const decodedToken = jwt_decode(token) as Token;
    //so kann man rollen abfragen
    localStorage.setItem("userId", decodedToken.user.id);
  }

  public logout() {
    this.http.post(`${this.api}/logout`, {});
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  }

  public isLoggedIn() {
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token) as Token;
      //prüfen, ob er eh noch nicht abgelaufen ist der token
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if (expirationDate < new Date()) {
        console.log("token expired");
        localStorage.removeItem("token");
        return false;
      }
      return true;
    }
    return false;
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }
}
