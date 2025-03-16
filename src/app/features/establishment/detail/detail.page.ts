import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton } from '@ionic/angular/standalone';
import Swiper from 'swiper';
import { CardProductComponent } from 'src/app/shared/components/card-product/card-product.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonBackButton,
    CardProductComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetailPage implements OnInit {

  isScrolled: boolean = false;
  slides = ['assets/images/food-2.jpg', 'assets/images/food-3.jpg'];
  categories = ['Burger', 'Pizza', 'Juice', 'Ice cream', 'Fast food'];
  foods = [1,2,3,4,5,6,7]

  constructor() { }

  ngOnInit() {
  }

  onContentScroll(event: any) {
    this.isScrolled = event.detail.scrollTop > 5; // Ajustez la valeur selon vos besoins
  }

}
