import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderPage } from './order.page';
import { provideRouter } from '@angular/router';

describe('OrderPage', () => {
  let component: OrderPage;
  let fixture: ComponentFixture<OrderPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderPage],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
