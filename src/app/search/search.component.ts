import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap
} from "rxjs/operators";
import { Book } from "../shared/book";
import { BookStoreService } from "../shared/book-store.service";

@Component({
  selector: "bs-search",
  templateUrl: "./search.component.html"
})
export class SearchComponent implements OnInit {
  keyup = new EventEmitter<string>();
  isLoading = false;
  foundBooks: Book[] = [];
  @Output() bookSelected = new EventEmitter<Book>();

  constructor(private bs: BookStoreService) {}

  ngOnInit() {
    this.keyup
      .pipe(filter(term => term != ""))
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .pipe(tap(() => (this.isLoading = true)))

      .pipe(switchMap(searchTerm => this.bs.getAllSearch(searchTerm)))
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe(books => (this.foundBooks = books));
  }
}
