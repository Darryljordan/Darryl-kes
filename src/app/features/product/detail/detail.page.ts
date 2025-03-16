import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonFooter, IonButton, IonBackButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-product-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonFooter,
    IonBackButton
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetailPage implements OnInit {
  total: number = 0

  constructor(
    
  ) {
    
  }

  ngOnInit() {
  }

  decrement(){
    if(this.total > 0) this.total -= 1
    else return
  }

}
