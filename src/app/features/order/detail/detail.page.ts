import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonBackButton } from '@ionic/angular/standalone';
import { CardProductComponent } from 'src/app/shared/components/card-product/card-product.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [
    CardProductComponent,
    IonContent,
    IonHeader,
    CommonModule,
    IonBackButton
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetailPage implements OnInit {

  isScrolled: boolean = false

  constructor() { }

  ngOnInit() {
  }

  onContentScroll(event: any) {
    this.isScrolled = event.detail.scrollTop > 5; // Ajustez la valeur selon vos besoins
  }

}
