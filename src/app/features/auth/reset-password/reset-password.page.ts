import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IonContent, IonInput, IonButton, IonToast } from '@ionic/angular/standalone';
import { AuthService } from '../../../shared/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonInput,
    IonButton,
    RouterLink,
    IonToast
  ]
})
export class ResetPasswordPage implements OnInit {
  resetForm: FormGroup;
  newPasswordForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  showToast = false;
  showNewPasswordForm = false;
  phone: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.resetForm = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.pattern('^6[0-9]{8}$')]]
    });

    this.newPasswordForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit() {
    // Vérifier si l'utilisateur arrive avec un code de réinitialisation
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        this.showNewPasswordForm = true;
        this.newPasswordForm.patchValue({ code });
      }
    });
  }

  onRequestReset() {
    if (this.resetForm.valid) {
      this.isLoading = true;
      this.errorMessage = null;

      const { phone } = this.resetForm.value;
      this.phone = phone;

      this.authService.requestPasswordReset({ phone }).subscribe({
        next: () => {
          this.isLoading = false;
          this.showNewPasswordForm = true;
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message;
          this.showToast = true;
        }
      });
    } else {
      this.markFormGroupTouched(this.resetForm);
    }
  }

  onSetNewPassword() {
    if (this.newPasswordForm.valid) {
      this.isLoading = true;
      this.errorMessage = null;

      const { code, newPassword, confirmPassword } = this.newPasswordForm.value;
      const phone = this.phone || this.resetForm.get('phone')?.value;

      this.authService.setNewPassword({
        phone,
        code,
        newPassword,
        confirmPassword
      }).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message;
          this.showToast = true;
        }
      });
    } else {
      this.markFormGroupTouched(this.newPasswordForm);
    }
  }

  private passwordMatchValidator(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getErrorMessage(formName: string, controlName: string): string {
    const form = formName === 'reset' ? this.resetForm : this.newPasswordForm;
    const control = form.get(controlName);

    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return 'Ce champ est requis';
      }
      if (control.errors['pattern']) {
        return 'Le numéro de téléphone doit commencer par 6 et contenir 9 chiffres';
      }
      if (control.errors['minlength']) {
        const minLength = control.errors['minlength'].requiredLength;
        return `Ce champ doit contenir au moins ${minLength} caractères`;
      }
      if (controlName === 'confirmPassword' && this.newPasswordForm.errors?.['passwordMismatch']) {
        return 'Les mots de passe ne correspondent pas';
      }
    }
    return '';
  }
}
