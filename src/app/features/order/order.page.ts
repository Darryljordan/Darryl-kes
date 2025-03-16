import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonTabs, IonTabBar, IonTabButton, IonTab } from '@ionic/angular/standalone';
import { CardOrderComponent } from 'src/app/shared/components/card-order/card-order.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonBackButton,
    IonTabs,
    IonTabBar,
    IonTabButton,
    CardOrderComponent,
    IonTab
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OrderPage implements OnInit {
  isScrolled: boolean = false;
  orders = [1,2,3,4,5,6]

  constructor() { }

  ngOnInit() {
  }

  onContentScroll(event: any) {
    this.isScrolled = event.detail.scrollTop > 5; // Ajustez la valeur selon vos besoins
  }

}
