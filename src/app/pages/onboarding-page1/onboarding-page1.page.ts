import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-onboarding-page1',
  templateUrl: './onboarding-page1.page.html',
  styleUrls: ['./onboarding-page1.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, CommonModule, FormsModule]
})
export class OnboardingPage1Page implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('OnboardingPage1 initialized');
  }

  onSkip() {
    console.log('Skipping onboarding')
    this.router.navigateByUrl('/auth/login', { replaceUrl: true });
  }

  onNext() {
    console.log('Moving to next onboarding page');
    this.router.navigateByUrl('/onboarding-page2', { replaceUrl: true });
  }

}
