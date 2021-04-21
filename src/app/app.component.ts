import { Component, VERSION } from "@angular/core";
import { Book } from "./shared/book";

//Komponente wird angezeigt, wenn sie einen Tag <my-app> findet --> index.html
@Component({
  selector: "bs-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  listOn = true;
  detailsOn = false;
  book: Book;

  showList() {
    this.listOn = true;
    this.detailsOn = false;
  }

  showDetails(book: Book) {
    this.book = book;
    this.listOn = false;
    this.detailsOn = true;
  }
}
