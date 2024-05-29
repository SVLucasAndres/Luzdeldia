import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Database, object, ref } from '@angular/fire/database';
import { AlertController, ToastController } from '@ionic/angular';
import { Route, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { set } from 'firebase/database';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  cargando: boolean=false;
  user: any;
  contra:any;
  constructor(private storage:Storage,private database:Database, private toast:ToastController, private route:Router, private alertController:AlertController) {}
  async presentToast(position: 'top' | 'middle' | 'bottom', content:any, color:any,icon:any) {
    const toast = await this.toast.create({
      message: content,
      duration: 5000,
      position: position,
      color: color,
      icon:icon ,
    });

    await toast.present();
  }
  async inses(){
    this.cargando=true;
    const route = ref(this.database, 'users/'+this.user+'/state');
    object(route).subscribe(async attributes=> {
      const val = attributes.snapshot.val();
      if(val==false){
        this.presentToast('top',"Error: Prueba ya hecha","secondary","sad-outline");
        this.cargando=false;
      }else {
        const route = ref(this.database, 'users/'+this.user);
        await set(route,{state:false});
        await this.storage.set('User',this.user);
        this.route.navigate(['preguntas']);
        this.cargando=false;
      }
    })
    
  }
 
  async ngOnInit() {
    this.storage.create();
    
  }
  
}
