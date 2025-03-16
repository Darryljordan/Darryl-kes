import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-card-order',
  templateUrl: './card-order.component.html',
  styleUrls: ['./card-order.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    IonButton,
    RouterLink,
    IonText
  ]
})
export class CardOrderComponent  implements OnInit {

  @Input() showStatus: boolean = false

  constructor() { }

  ngOnInit() {}

}
