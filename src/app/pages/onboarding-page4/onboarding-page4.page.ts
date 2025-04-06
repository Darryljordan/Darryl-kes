import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-onboarding-page4',
  templateUrl: './onboarding-page4.page.html',
  styleUrls: ['./onboarding-page4.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton,CommonModule, FormsModule]
})
export class OnboardingPage4Page implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('OnboardingPage4 initialized');
  }

  goToNextPage() {
    this.router.navigateByUrl('/auth/login', { replaceUrl: true });
  }

}
