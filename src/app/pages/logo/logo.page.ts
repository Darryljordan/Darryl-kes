import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.page.html',
  styleUrls: ['./logo.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class LogoPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('LogoPage initialized');
    setTimeout(() => {
      console.log('Redirecting to Onboarding Page');
      this.router.navigateByUrl('/pages/onboarding-page1', { replaceUrl: true });
    }, 5000);
  }
}
