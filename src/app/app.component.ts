import { Component, VERSION } from "@angular/core";
import { AuthenticationService } from "./shared/authentication.service";
import { Book } from "./shared/book";

//Komponente wird angezeigt, wenn sie einen Tag <my-app> findet --> index.html
@Component({
  selector: "bs-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private authService: AuthenticationService) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getLoginLabel() {
    if (this.isLoggedIn()) {
      return "Logout";
    } else {
      return "Login";
    }
  }
}
