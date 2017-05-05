import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import "rxjs/add/operator/debounceTime";

export abstract class Form {
  form: FormGroup;
  formErrors: Object;
  validationMessages: Object;
  formErrorsFields: any;

  constructor(
    public toastService: any,
  ) {
    this.formErrors = new Object;
    this.validationMessages = new Object;
  }

  setUpForm(form : FormGroup) {
    this.form = form;
    this.initializeFormErrors();
    this.formErrorsFields = Object.keys(this.formErrors);
    this.setValidationMessages();
    this.form.valueChanges
    .debounceTime(500)
    .subscribe(data => this.onValueChanged());
  }

  initializeFormErrors() {
    for (var key in this.form.controls) {
    this.formErrors[key] = [];
    }
  }

  onValueChanged() {
    for (let field in this.formErrors) {
      this.formErrors[field] = [];
      this.form[field] = '';
      let control = this.form.get(field);
      if (control && control.dirty && !control.valid) {
        let messages = this.validationMessages[field];
        for (let key in control.errors) {
          this.formErrors[field].push(messages[key]);
        }
      }
    }
  }

  abstract setValidationMessages();

  markAllFieldsAsDirty () {
    const form = this.form;
    for (const field in this.formErrors) {
      const control = form.get(field);
      control.markAsDirty();
    }
  }

  markFormAsInvalid() {
    this.markAllFieldsAsDirty();
    this.onValueChanged();
    this.toastService.presentToast('Verifique o formulário.', 'warning');
  }

  isNotEmpty(array) {
    if (array.length > 0)
      return true;
    else {
      return false;
    }
  }

}
