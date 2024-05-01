import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Database, object, ref } from '@angular/fire/database';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  valor: any;
  constructor(private database:Database) {}
 async notify(title:any,message:any){
  await LocalNotifications.schedule({
    notifications: [
      {
        title: title,
        body: message,
        id: 1,
        schedule:{
          allowWhileIdle:true
        }
      }
    ]
  });
 }
 frase:string="";
 color:any;
  async ngOnInit() {
    await LocalNotifications.requestPermissions();//solicitar permisos de la app
    
    const route = ref(this.database, "Luz/ldr");
    object(route).subscribe(attributes => {
      const valores_db = attributes.snapshot.val();
      this.valor = valores_db;
      
      if(this.valor>80){
        this.notify("¡Es un día soleado y hermoso 😎!","Las aves cantan, las flores florecen. En días así, niños como tu deberían jugar o tomar un helado");
        this.frase = "¡Es un día soleado 😎!";
        this.color = "light";
      }
      if(this.valor>20 && this.valor<90){
        this.frase = "¡Es un día normal 🤷‍♂️! como cualquier otro";
        this.color = "medium";
      }
      if(this.valor<20){
        this.notify("¡Está oscuro afuera 🥱!","Te recomiendo leer un libro o echarte una siesta");
        this.frase = "¡Está oscuro afuera 🥱!";
        this.color = "dark";
      }
    });
  }
  getBackgroundColor(): string {
    const scale = this.valor / 100;
    return `rgba(255, 255, 0, ${scale})`;
  }
}
