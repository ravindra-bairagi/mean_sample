import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule }   from '@angular/router/testing';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookComponent } from './book.component';
import {BookdetailsComponent} from './../bookdetails/bookdetails.component';
import {AddbookComponent} from './../addbook/addbook.component';
import {Router, Routes} from "@angular/router";

// const appRoutes: Routes = [
//   {
//     path: 'books',
//     component: BookComponent,
//     data: { title: 'Book List' }
//   },
//   {
//     path: 'book-details/:id',
//     component: BookdetailsComponent,
//     data: { title: 'Book Details' }
//   },
//   {
//     path: 'book-add',
//     component: AddbookComponent,
//     data: { title: 'Create Book' }
//   },
//   { path: '',
//     redirectTo: '/books',
//     pathMatch: 'full'
//   }
// ];

let location: Location;
let router: Router;
let fixture;


describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let httpMock: HttpTestingController;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookComponent,BookdetailsComponent,AddbookComponent ],
      imports: [RouterTestingModule, FormsModule, HttpClientModule, HttpClientTestingModule],
      providers:[Location]
    })
    .compileComponents();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
    httpMock = TestBed.get(HttpTestingController);
  }));
  afterEach(() => {
    httpMock.verify();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('navigate to "" redirects you to /books', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    expect(location.pathname).toBe('/books');
  }));
  it('should call initialize method', () => {

    let spy = spyOn(component,'initializeBooks');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
  it('should return http data', () => {
    const dummyData = [{"updated_date":"2018-04-16T11:09:57.723Z","_id":"5ad48485c984df2cc83f4e26","isbn":"123442123, 97885654453443","title":"Learn how to build modern web application with MEAN stack","author":"Didin J.","description":"The comprehensive step by step tutorial on how to build MEAN (MongoDB, Express.js, Angular 5 and Node.js) stack web application from scratch","published_year":"2017","publisher":"Djamware.com","__v":0},{"updated_date":"2018-04-18T09:23:33.413Z","_id":"5ad70e9529e8282fdc87556d","isbn":"test","title":"test","author":"gopa bairagi","published_year":"1988","publisher":"myself","__v":0},{"updated_date":"2018-04-20T11:13:22.322Z","_id":"5ad9cb52d900fe2a50433132","isbn":"2007;1900","title":"harman ","author":"ravindra","published_year":"2018","publisher":"ravindra","__v":0},{"updated_date":"2018-04-20T12:35:34.386Z","_id":"5ad9de96fef2762358a240c3","title":"asd","isbn":"asd","author":"asd","published_year":"123123","publisher":"asdasd","__v":0}];
    component.initializeBooks().then((data) => {
      expect(data[0].author).toEqual('Didin J.');
      //console.log(data);
      let cards = fixture.debugElement.nativeElement.queryAll(By.css('.card'));
      expect(cards.length).toBe(3);
    });

    const req = httpMock.expectOne(`/book/`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyData);
  });
  it('should redirect to details page when book is selected', fakeAsync(() => {
    const dummyData = [{"updated_date":"2018-04-16T11:09:57.723Z","_id":"5ad48485c984df2cc83f4e26","isbn":"123442123, 97885654453443","title":"Learn how to build modern web application with MEAN stack","author":"Didin J.","description":"The comprehensive step by step tutorial on how to build MEAN (MongoDB, Express.js, Angular 5 and Node.js) stack web application from scratch","published_year":"2017","publisher":"Djamware.com","__v":0},{"updated_date":"2018-04-18T09:23:33.413Z","_id":"5ad70e9529e8282fdc87556d","isbn":"test","title":"test","author":"gopa bairagi","published_year":"1988","publisher":"myself","__v":0},{"updated_date":"2018-04-20T11:13:22.322Z","_id":"5ad9cb52d900fe2a50433132","isbn":"2007;1900","title":"harman ","author":"ravindra","published_year":"2018","publisher":"ravindra","__v":0},{"updated_date":"2018-04-20T12:35:34.386Z","_id":"5ad9de96fef2762358a240c3","title":"asd","isbn":"asd","author":"asd","published_year":"123123","publisher":"asdasd","__v":0}];
    component.initializeBooks().then((data) => {
      expect(data[0].author).toEqual('Didin J.');
      //console.log(data);
      let cards = fixture.debugElement.nativeElement.queryAll(By.css('.btnbookdetails'));
      cards[0].nativeElement.click();
      tick(50);
      expect(location.pathname).toBe('/book-details');
    });

    const req = httpMock.expectOne(`/book/`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyData);
  }));
});
