import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {
  searchPlace = '';
  stateChangeval = 'Current';
  type = false;
  selectedLocal;
  WeatherData:any={
    temp_celcius:'',
    isDay:'',
    temp_min:'',
    temp_max: '',
    temp_feels_like:'',
    main:{humidity:''},
    weatherDes:'',
    name:''
  };
  weatherShowData:any={
    temp_celcius:'',
    isDay:'',
    temp_min:'',
    temp_max: '',
    temp_feels_like:'',
    main:{humidity:''},
    weatherDes:'',
    name:''
  };
  localWeather:any = [];
  selectedCityName = '';
  modelDdetails:any;
  constructor(private weather:ApiService,public toast: ToastController,
    public alertController: AlertController, private platform: Platform,
    private router: Router,
     private nativeFirebaseAnalytics:FirebaseAnalytics
  ) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.nativeFirebaseAnalytics.setUserId("123123");
      this.nativeFirebaseAnalytics.setUserProperty("Weather","Feedback");
    });
    
    if(!this.type){
      this.callLocaldata();
    }else{
      this.searchWeather('bangalore','user');
    }
    this.platform.resume.subscribe(async () => {
      try{
        this.selectedCityName = window.localStorage.getItem('selectedCity');
      }catch(err){}
      // alert('Resume event detected: '+this.selectedCityName);
      if(this.selectedCityName){
        this.searchWeather(this.selectedCityName,'resume');
      }
    });
  }
  async callLocaldata(){
    await this.weather.getlocalWeather('weather')
      .subscribe((res: any) =>{
        let response:any;
        response = JSON.parse(res); 
        this.localWeather = response.data.weather;
        this.formate(this.localWeather[0],'old');
        this.selectedLocal = this.localWeather[0].city;
    } );
  }
  changeLocalToAPI(type){
    this.type = type;
  }
  searchInLocal(name){
    this.localWeather.forEach(element => {
      if(name === element.city){
        this.formate(element,'old');
        this.selectedCity(name);
      }
    });
  }
    // Get user saved place weather
    getLocalData(){
      return JSON.parse(window.localStorage.getItem('saved'));
    }
    // Call weather API to get weather details
    async searchWeather(place,type) {
        this.selectedCity(place);
        this.weather.getWeatherDetails(place).subscribe((res: any) => {
          if(type == 'resume'){
            this.formate(this.setWeatherData(res),'resume');
          }else{this.formate(this.setWeatherData(res),'api');}
          
        },
        err => {
          console.log('searchWeather:',err);
          this.alertMessage("Incorrect location");
        });
    }
    selectedCity(city){
      window.localStorage.setItem('selectedCity',city);
    }
  // formatting the weather details common function
    setWeatherData(data){
      let details = data;
      let sunsetTime = new Date(details.sys.sunset * 1000);
      details.sunset_time = sunsetTime.toLocaleTimeString();
      let currentDate = new Date();
      details.isDay = (currentDate.getTime() < sunsetTime.getTime());
      details.temp_celcius = (details.main.temp - 273.15).toFixed(0);
      details.temp_min = (details.main.temp_min - 273.15).toFixed(0);
      details.temp_max = (details.main.temp_max - 273.15).toFixed(0);
      details.temp_feels_like = (details.main.feels_like - 273.15).toFixed(0);
      details.tdate = currentDate;
      details.weatherIcon = this.setIcons(details.weather[0].main);
      details.weatherDes = details.weather[0].description
      return details;
    }
    formate(data, way){
      if(way == 'resume'){
        this.modelDdetails = {
          temp_celcius : data.temp_celcius,
          temp_min: data.temp_min,
          temp_max: data.temp_max,
          name:data.name,
          weatherDes: data.weatherDes,
          tdate:data.tdate,
          weatherIcon: data.weatherIcon
        }
        this.presentAlertConfirm(this.modelDdetails);
        // alert(JSON.stringify(this.modelDdetails));
        return;
      }

      if(way == 'api'){
        this.weatherShowData = {
          temp_celcius : data.temp_celcius,
          temp_min: data.temp_min,
          temp_max: data.temp_max,
          name:data.name,
          weatherDes: data.weatherDes,
          tdate:data.tdate,
          weatherIcon: data.weatherIcon
        }
      }else{
        this.weatherShowData = {
          temp_celcius : data.weatherP,
          temp_min: data.min,
          temp_max: data.max,
          name:data.city,
          weatherDes: data.weather,
          tdate:new Date(),
          weatherIcon: ((data.weatherP > 25) ? "Sunny":"snow")
        }
        // console.log((data.weatherP > 25),(data.weatherP > 25) ? "Sunny":"snow");
      }      
    }
    setIcons(icon){
      console.log(icon);
      switch(icon){
        case 'Clouds':
          return 'cloud'
        break;
        case 'Drizzle':
          return 'rainy'
        break;
        case 'Sunny':
          return 'sunny'
        break;
        case 'Thunderstorm':
          return 'thunderstorm'
        break;
        case 'Haze':
          return 'partly-sunny'
        break;
        case 'Mist':
          return 'snow'
        break;
        default:
          return 'cloud'
      }
    }
    async alertMessage(message:string){
      const toast = await this.toast.create({
        message: message,
        position: 'bottom',
        duration: 2000
      });
      toast.present();
    }
    feedBack(res){
      if(res == 'bad') this.alertMessage("Thank you for your feedback!")
      else
        this.alertMessage('Thank you for your feedback!')
    }
    async presentAlert(msg) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        message: msg,
        buttons: ['OK']
      });
  
      await alert.present();
    }

    fireBase(fb){
      console.log("fire calling:",fb);
      // Track an event with custom events and params
      // this.fireFnalytics.logEvent('feedback-event', {status:fb})
      //   .then(() => this.alertMessage('Thank you for your feedback!'))
      //   .catch(err => this.alertMessage(err));

        this.nativeFirebaseAnalytics.logEvent('my_event', {param1: fb})
          .then((res: any) => this.alertMessage('Thank you for your feedback!'))
          .catch((error: any) => this.alertMessage(error));
    }


    camera(){
      this.router.navigate(['/takePhoto']);
    }
    async presentAlertConfirm(data) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'New!',
        subHeader: 'Do you want to update?',
        message: 'Current weather <strong>'+data.temp_celcius+'°</strong>!!!',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Okay',
            handler: () => {
              this.weatherShowData = data;
              this.alertMessage("Status updated!");
            }
          }
        ]
      });
      await alert.present();
  }
}
