import { Component, OnInit } from '@angular/core'
import { Validators, FormGroup, FormBuilder } from '@angular/forms'
import { Book } from 'src/app/models/books'
import { BookFormValidationService } from '../../book-form-validation.service'

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {
  bookForm!: FormGroup
  tableData: Book[] = []
  cols: Book[] = []
  submitted = false

  constructor (
    private readonly fb: FormBuilder,
    public localStorage: BookFormValidationService
  ) { }

  ngOnInit (): void {
    this.cols = [
      {
        field: 'id',
        header: '#'
      },
      {
        field: 'listTitle',
        header: 'List Title'
      },
      { field: 'bookTitle', header: 'Book Title' },
      { field: 'authorName', header: 'Author Name' },
      { field: 'yearOfPublishing', header: 'Publishing Year' },
      { field: 'coverImage', header: 'Cover Image' }
    ]
    this.tableData = [
      {
        id: 1,
        listTitle: 'My Favorite Books',
        bookTitle: 'Dune',
        authorName: 'Frank Herbert',
        yearOfPublishing: 1965,
        coverImage:
          'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1555447414l/44767458.jpg'
      },
      {
        id: 2,
        listTitle: 'My Favorite Books',
        bookTitle: "Ender's Game",
        authorName: 'Orson Scott Card',
        yearOfPublishing: 1985,
        coverImage:
          'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1408303130l/375802._SY475_.jpg'
      },
      {
        id: 3,
        listTitle: 'My Favorite Books',
        bookTitle: '1984',
        authorName: 'George Orwell',
        yearOfPublishing: 1949,
        coverImage:
          'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1657781256l/61439040._SX318_.jpg'
      },
      {
        id: 4,
        listTitle: 'My Favorite Books',
        bookTitle: 'Fahrenheit 451',
        authorName: 'Ray Bradbury',
        yearOfPublishing: 1953,
        coverImage:
          'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1383718290l/13079982.jpg'
      },
      {
        id: 5,
        listTitle: 'My Favorite Books',
        bookTitle: 'Brave New World',
        authorName: 'Aldous Huxley',
        yearOfPublishing: 1932,
        coverImage:
          'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1575509280l/5129._SY475_.jpg'
      }
    ]
    this.bookForm = this.fb.group({
      id: ['', Validators.required],
      listTitle: ['', Validators.required],
      bookTitle: ['', Validators.required],
      authorName: ['', Validators.required],
      yearOfPublishing: ['', Validators.required],
      coverImage: ['', Validators.required]
    })
  }

  get bookFormControl () {
    console.log(typeof (this.bookForm.controls))
    return this.bookForm.controls
  }

  text = []
  sort (): void {
    this.tableData.sort((a, b) => 0 - (a > b ? -1 : 1))
    console.log(this.tableData)
  }

  onSubmit (): void {
    if (this.bookForm.valid) {
      this.localStorage.saveData(
        'formValue',
        JSON.stringify(this.bookForm.value)
      )
      this.submitted = true

      console.table(this.bookForm.value)

      this.tableData.push(this.bookForm.value)
    }
    this.localStorage.getData(this.bookForm.value)
    this.bookForm.reset()
  }

  deleteRow (x: any): void {
    const delBtn = confirm(' Do you want to delete ?')
    if (delBtn) {
      this.tableData.splice(x, 1)
    }
  }
}
