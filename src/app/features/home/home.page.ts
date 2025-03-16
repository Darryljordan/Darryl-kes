import { Component, OnInit, EnvironmentInjector, inject, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonAvatar, IonHeader, IonButton, IonSearchbar, IonRow, IonCol, IonIcon, IonItem, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { notifications, filter } from 'ionicons/icons';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CardProductComponent } from 'src/app/shared/components/card-product/card-product.component';
import { CardEstablishmentComponent } from 'src/app/shared/components/card-establishment/card-establishment.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CardProductComponent,
    CardEstablishmentComponent,
    IonContent,
    IonHeader,
    IonAvatar,
    IonButton,
    IonSearchbar,
    IonRow,
    IonCol,
    IonIcon,
    IonItem,
    IonLabel
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  public environmentInjector = inject(EnvironmentInjector);
  slides = [1,2,3,4,5,6];
  // @ViewChild('swiper') swiperRef: ElementRef | undefined;
  isScrolled = false;

  constructor() {
    addIcons({ notifications, filter });
  }

  ngOnInit(): void {
  }

  onContentScroll(event: any) {
    // console.log(event)
    this.isScrolled = event.detail.scrollTop > 5; // Ajustez la valeur selon vos besoins
  }

}
