import { Book } from "./book";
export class BookFactory {
  //legt ein leere dummy-book an
  static empty(): Book {
    return new Book(
      null,
      "",
      "",
      [],
      new Date(),
      0,
      "",
      0,
      [{ id: 0, url: "", title: "" }],
      ""
    );
  }
  //gibt buch zurück
  static fromObject(rawBook: any): Book {
    return new Book(
      rawBook.id,
      rawBook.isbn,
      rawBook.title,
      rawBook.authors,
      typeof rawBook.published === "string"
        ? new Date(rawBook.published)
        : rawBook.published,
      rawBook.user_id,
      rawBook.subtitle,
      rawBook.rating,
      rawBook.images,
      rawBook.description
    );
  }
}
