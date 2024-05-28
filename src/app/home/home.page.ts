import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Database, object, ref } from '@angular/fire/database';
import { AlertController, ToastController } from '@ionic/angular';
import { Route, Router } from '@angular/router';
import { Storage } from '@ionic/storage';


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
    if(this.contra == null || this.user==null){
      this.presentToast('top',"Llena todos los campos","secondary","sad-outline");
      this.cargando=false;
    }else{
    const route = ref(this.database, 'users/'+this.user);
    
    object(route).subscribe(async attributes1 => {
      const valores_db = attributes1.snapshot.val();
      if(await valores_db == null){
        this.presentToast('top',"Usuario no existente. Registrate en el stand de CARLA","tertiary","warning-outline");
        this.cargando=false;
      }else{
        const route1 = ref(this.database,'users/'+this.user+'/pass');
        object(route1).subscribe(async attributes2 => {
          const contras = attributes2.snapshot.val();
          if(await contras == this.contra){
            const route1 = ref(this.database,'users/'+this.user+'/state');
             object(route1).subscribe(async attributes3 => {
               if(await attributes3.snapshot.val()==true){
                this.route.navigate(['preguntas']);
                this.storage.set('User',this.user);
                this.cargando=false;
              }else{
                this.presentToast('top',"Ya haz hecho el test. Si deseas resolverlo de nuevo, deberás conseguir un nuevo código","warning","information-circle-outline");
                this.cargando=false;
              }
             });
          }else{
            this.presentToast('top',"Contraseña incorrecta","danger","close-circle-outline");
            this.cargando=false;
          }
        });
      }
    });
  }
  }
 
  async ngOnInit() {
    this.storage.create();
    
  }
  
}
