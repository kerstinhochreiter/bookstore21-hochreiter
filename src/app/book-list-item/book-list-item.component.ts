import { Component, Input, OnInit } from "@angular/core";
import { Book } from "../shared/book";

@Component({
  selector: "a.bs-book-list-item",
  templateUrl: "./book-list-item.component.html"
})
export class BookListItemComponent implements OnInit {
  //hier ist die book Variable von book-list-component
  @Input() book: Book;
  constructor() {}

  ngOnInit() {}
}
