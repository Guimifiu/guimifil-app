import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Form } from '../../helpers/form';
import { FormErrorMessages } from '../../validators/form-error-messages';
import { AuthenticationService } from '../../providers/authentication-service';
import { RegisterPage } from '../register/register';
import { MenuTabsPage } from '../menu-tabs/menu-tabs';
import { User } from '../../models/user';
import { ToastService } from '../../providers/toast-service';
import { LoadingService } from '../../providers/loading-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ToastService, LoadingService],
 
  animations: [
 
    //For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0'}),
        animate('2000ms ease-in-out')
      ])
    ]),
 
    //For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0)'}),
        animate('1000ms ease-in-out')
      ])
    ]),
 
    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('2000ms 200ms ease-in', keyframes([
          style({transform: 'translate3d(0,2000px,0)', offset: 0}),
          style({transform: 'translate3d(0,-20px,0)', offset: 0.9}),
          style({transform: 'translate3d(0,0,0)', offset: 1})
        ]))
      ])
    ]),
 
    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0}),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ]
})

export class LoginPage extends Form {
  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";
  
  user = new User;
  loginForm: FormGroup;
  loading: Loading;
  registerCredentials = {email: '', password: ''};
  tabMenuElement: any;

  constructor(
    public navCtrl: NavController,
    public authenticationService: AuthenticationService,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    public toastService: ToastService, 
    public loadingService: LoadingService,
  ) {
    super(toastService);
    this.buildForm();
    this.setUpForm(this.loginForm);
    this.tabMenuElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewWillEnter() {
    this.tabMenuElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabMenuElement.style.display = 'flex';
  }

  buildForm() {
    var validEmail = "^(([^<>()\\[\\]\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\"]+)*)|(\".+\"))@(([^<>()[\\]\\.,;:\\s@\"]+\\.)+[^<>()[\\]\\.,;:\\s@\"]{2,})$"
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.pattern(validEmail),
        Validators.required,
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])],
    });
  }

  setValidationMessages() {
    this.validationMessages = {
      'email': {
        'required': FormErrorMessages.required('Email'),
        'pattern': FormErrorMessages.invalid('Email'),
      },
      'password': {
        'required': FormErrorMessages.required('Senha'),
      }
    }
  }

  facebookLogin() {
    this.loadingService.showLoading('Entrando...');
    this.authenticationService
      .facebookLogin()
      .then(() => {
        this.goToUserRootMenuPage();
      })
      .catch(error => {
        this.registerSocialMediaUser(error)
      })
      .then(() => this.loadingService.dismissLoading());
  }

  googleLogin() {
    this.loadingService.showLoading('Entrando...');
    this.authenticationService
      .googleLogin()
      .then(() => {
        this.goToUserRootMenuPage();
      })
      .catch(error => {
        this.registerSocialMediaUser(error)
      })
      .then(() => this.loadingService.dismissLoading());
  }

  onSubmit() {
    if(this.loginForm.valid) {
      this.loadingService.showLoading('Entrando...');
      this.user.email = this.loginForm.value.email;
      this.user.password = this.loginForm.value.password;
      this.nativeLogin();
    } else {
      this.markFormAsInvalid();
    }
  }

  nativeLogin() {
    this.authenticationService
      .nativeLogin(this.user)
      .then(allowed => {
        setTimeout(() => {
        this.goToUserRootMenuPage();
        });
      })
      .catch(error => {
        this.toastService.presentToast(error, 'warning');
      })
      .then(() => this.loadingService.dismissLoading());
  }

  registerSocialMediaUser(error) {
        if (error instanceof User) {
          this.authenticationService
            .register(error)
            .then(user => {
              this.goToUserRootMenuPage();
            })
            .catch(error => console.log(JSON.stringify(error)));
            
        } 
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  goToUserRootMenuPage() {
    this.navCtrl.setRoot(MenuTabsPage);
  }

}
