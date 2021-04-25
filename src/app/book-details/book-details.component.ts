import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication.service";
import { Book } from "../shared/book";
import { BookFactory } from "../shared/book-factory";
import { BookStoreService } from "../shared/book-store.service";

@Component({
  selector: "bs-book-details",
  templateUrl: "./book-details.component.html"
})
export class BookDetailsComponent implements OnInit {
  book: Book = BookFactory.empty();
  constructor(
    private bs: BookStoreService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthenticationService
  ) {}

  ngOnInit() {
    //man holt sich die gesamte Route und durch snapshot params bekommt man z.B :isbn
    const params = this.route.snapshot.params;
    //gibt mir die genau dieses Buch mit der ISBN
    this.bs.getSingle(params["isbn"]).subscribe(res => (this.book = res));
  }

  //Hilfmethode damit ich Sterne vom Rating anzeigen kann
  //weil ich nicht drüberiterieren kann
  getRating(num: number) {
    return new Array(num);
  }

  removeBook() {
    if (confirm("Wollen Sie das Buch wirklich löschen?")) {
      //asynchron!! --> Inhalt von Subscribe wird erst ausgeführt wenn REST Call fertig ist
      //Was verlang jeder asynchroner aufruf?
      //eine Callback Funktion
      this.bs.remove(this.book.isbn).subscribe(res => {
        this.router.navigate(["../"], { relativeTo: this.route });
      });
    }
  }
}
