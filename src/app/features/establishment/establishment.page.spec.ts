import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstablishmentPage } from './establishment.page';
import { provideRouter } from '@angular/router';

describe('EstablishmentPage', () => {
  let component: EstablishmentPage;
  let fixture: ComponentFixture<EstablishmentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstablishmentPage],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablishmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
