import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonContent,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    CommonModule,
    IonText
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CardProductComponent  implements OnInit {
  @Input() product: any;
  @Input() showEstablishmentName: boolean = true;
  @Input() type: string = 'home';
  total: number = 0

  constructor() { }

  ngOnInit() {}

  decrement(){
    if(this.total > 0) this.total -= 1
    else return
  }

}
