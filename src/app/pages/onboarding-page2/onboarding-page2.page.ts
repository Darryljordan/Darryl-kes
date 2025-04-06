import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-onboarding-page2',
  templateUrl: './onboarding-page2.page.html',
  styleUrls: ['./onboarding-page2.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, CommonModule, FormsModule]
})
export class OnboardingPage2Page implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('OnboardingPage2 initialized');
  }

  goToLogin() {
    this.router.navigateByUrl('/auth/login', { replaceUrl: true });
  }

  goToNextPage() {
    this.router.navigateByUrl('/onboarding-page3', { replaceUrl: true });
  }

}
