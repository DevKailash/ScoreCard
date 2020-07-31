import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

interface Loginuser{
  email?:string,
  password?:string
}
interface Registeruser{
  email?:string,
  password?:string
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
  register:Loginuser = {
    email:null,
    password:null
  };
  isButtonActive:boolean = true;
  constructor(public toast: ToastController, private AngAuth:AngularFireAuth,
    private router: Router) { }

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
    if(this.register.email && this.register.password){
      await this.AngAuth.createUserWithEmailAndPassword(this.register.email, this.register.password)
    .then((res: any) => this.alertMessage("Register Success"))
    .catch((error: any) => console.error(error));
    }
  }
  async logIn(){
    await this.AngAuth.signInWithEmailAndPassword(this.user.email, this.user.password)
    .then((res: any) =>{
      console.log(res);
      this.alertMessage("Login Success");
      this.navigateToHome();
    })
    .catch((error: any) => console.error(error));
    
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
    this.router.navigate(['/home']);
  }
}
