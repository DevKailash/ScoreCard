import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

interface Loginuser{
  email?:string,
  password?:string
}
interface Registeruser{
  email?:string,
  password?:string,
  repassword?:string
}
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isActiveToggleTextPassword: Boolean = true;
  user:Loginuser = {
    email:null,
    password:null
  };
  register:Registeruser = {
    email:null,
    password:null,
    repassword:null
  };
  stripeForm;
  isButtonActive:boolean = true;
  constructor(public toast: ToastController, private AngAuth:AngularFireAuth,
    private router: Router, public loader: LoadingController) { }

  ngOnInit() {
  }
  public toggleTextPassword(): void{
      this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword==true)?false:true;
  }
  public getType() {
      return this.isActiveToggleTextPassword ? 'password' : 'text';
  }
  onChangeTime(eValue){
    if(this.user.email && this.user.password)  {
      this.isButtonActive = false;
    } else{
      this.isButtonActive = true;
    }
  }
  async registerUser(){
    const loading = await this.loader.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    let passLn = 0;
    try{
      passLn = this.register.password.length
    }catch(err){}
    if(!this.register.email){
      this.alertMessage("Enter user name");
      return;
    }
    if(passLn < 6){
      this.alertMessage("Enter 6 digits");
      return;
    }
    if(this.register.password !== this.register.repassword){
      this.alertMessage("Password not same");
      return;
    }
    await loading.present();
    if(this.register.email && this.register.password){
      await this.AngAuth.createUserWithEmailAndPassword(this.register.email, this.register.password)
    .then((res: any) =>{  loading.dismiss(); this.alertMessage("Register Success");})
    .catch((error: any) =>{
      loading.dismiss(); this.alertMessage(error.message);
    });
    }
  }
  async logIn(){
    const loading = await this.loader.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();
    await this.AngAuth.signInWithEmailAndPassword(this.user.email, this.user.password)
    .then((res: any) =>{
      console.log(res);
      loading.dismiss();
      this.alertMessage("Login Success");
      this.navigateToHome();
    })
    .catch((error: any) => { loading.dismiss(); this.alertMessage(error.message);});
  }
  async alertMessage(message:string){
    const toast = await this.toast.create({
      message: message,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }
  navigateToHome(){
    this.router.navigate(['/takePhoto']);
  }
}
