import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-onboarding-page3',
  templateUrl: './onboarding-page3.page.html',
  styleUrls: ['./onboarding-page3.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, CommonModule, FormsModule]
})
export class OnboardingPage3Page implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('OnboardingPage3 initialized');
  }

  goToLogin() {
    this.router.navigateByUrl('/auth/login', { replaceUrl: true });
  }

  goToNextPage() {
    this.router.navigateByUrl('/onboarding-page4', { replaceUrl: true });
  }

}
