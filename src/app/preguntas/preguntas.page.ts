import { Component, OnInit } from '@angular/core';
import { Database, object,QueryConstraintType } from '@angular/fire/database';
import { Router } from '@angular/router';
import { AlertController, ItemReorderEventDetail, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ref, set} from 'firebase/database';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.page.html',
  styleUrls: ['./preguntas.page.scss'],
})
export class PreguntasPage implements OnInit {
  timer: any;
  minutes: number = 0;
  seconds: number = 0;
  running: boolean = false;


  startTimer() {
    if (!this.running) {
      this.running = true;
      this.timer = setInterval(() => {
        this.seconds++;
        if (this.seconds === 60) {
          this.minutes++;
          this.seconds = 0;
        }
      }, 1000);
    }
  }
  p1:any;
  p2:any;
  optionsp2: { value: number, label: string }[] = [
    { value: 1, label: 'CARLA, HORA, TAREA, COLOR' },
    { value: 2, label: 'CARLA, HORA, MÚSICA, COLOR' },
    { value: 3, label: 'CARLA, APAGAR, TAREAS, COLOR' },
    { value: 4, label: 'CUBO, HORA, TAREAS, COLOR' }
  ];
  shuffleOptions() {
    for (let i = this.optionsp2.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.optionsp2[i], this.optionsp2[j]] = [this.optionsp2[j], this.optionsp2[i]];
    }
    for (let i = this.optionsp5.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.optionsp5[i], this.optionsp5[j]] = [this.optionsp5[j], this.optionsp5[i]];
    }
    for (let i = this.optionsp12.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.optionsp12[i], this.optionsp12[j]] = [this.optionsp12[j], this.optionsp12[i]];
    }
    for (let i = this.optionsp13.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.optionsp13[i], this.optionsp13[j]] = [this.optionsp13[j], this.optionsp13[i]];
    }
    for (let i = this.optionsp14.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.optionsp14[i], this.optionsp14[j]] = [this.optionsp14[j], this.optionsp14[i]];
    }
    for (let i = this.optionsp15.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.optionsp15[i], this.optionsp15[j]] = [this.optionsp15[j], this.optionsp15[i]];
    }
    for (let i = this.optionsp6.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.optionsp6[i], this.optionsp6[j]] = [this.optionsp6[j], this.optionsp6[i]];
    }
    for (let i = this.optionsp8.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.optionsp8[i], this.optionsp8[j]] = [this.optionsp8[j], this.optionsp8[i]];
    }
    for (let i = this.optionsp9.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.optionsp9[i], this.optionsp9[j]] = [this.optionsp9[j], this.optionsp9[i]];
    }
  }
  p3:any;
  p4:any;
  p5:any;
  optionsp5: { value: number, label: string }[] = [
    { value: 1, label: 'Ionic' },
    { value: 2, label: 'WordPress' },
    { value: 3, label: 'Figma' },
    { value: 4, label: 'App Inventor Pro' }
  ];
  p6:any;
  optionsp6: { value: number, label: string }[] = [
    { value: 1, label: 'A que inicies sesión' },
    { value: 2, label: 'A que grabes tu voz' },
    { value: 3, label: 'A que programes una tarea' },
    { value: 4, label: 'A que la conectes a internet' }
  ];
  p7:any;
  p8:any;
  optionsp8: { value: number, label: string }[] = [
    { value: 1, label: 'Para grabar CARLA a tu usuario' },
    { value: 2, label: 'Un código de fábrica' },
    { value: 3, label: 'Un código único para tu celular' },
    { value: 4, label: 'Un código a decir a CARLA' }
  ];
  p9:any;
  optionsp9: { value: number, label: string }[] = [
    { value: 1, label: 'Pasar al siguiente comando' },
    { value: 2, label: 'Repetir el comando' },
    { value: 3, label: 'Decir el comando' }
  ];
  p10:any;
  p11:any;
  p12:any;
  optionsp12: { value: number, label: string }[] = [
    { value: 1, label: 'Dormir' },
    { value: 2, label: 'Motricidad' },
    { value: 3, label: 'Cantar' },
    { value: 4, label: 'Asearse' }
  ];
  p13:any;
  optionsp13: { value: number, label: string }[] = [
    { value: 1, label: '20' },
    { value: 2, label: '21' },
    { value: 3, label: '22' },
    { value: 4, label: '23' }
  ];
  p14:any;
  optionsp14: { value: number, label: string }[] = [
    { value: 1, label: 'Huiracocha Tutiven' },
    { value: 2, label: 'IPCA' },
    { value: 3, label: 'CEDIN Down' },
    { value: 4, label: 'Huairacocha Tutiven' }
  ];
  p15:any;
  optionsp15: { value: number, label: string }[] = [
    { value: 1, label: '12V' },
    { value: 2, label: '24V' },
    { value: 3, label: '5V' },
    { value: 4, label: '9V' }
  ];
  ok:boolean=false;
  puntaje:number=0;
  p4Res:boolean[]=[false,false,false,false];
  constructor(private storage:Storage, private database:Database, private alertController:AlertController, private toast:ToastController, private route:Router) { }
  items = ["Probar la voz","Esperar a que CARLA se ponga verde","Ir a la dirección e ingresar las credenciales de internet","Grabar nuestra voz","Esperar a que CARLA se ponga amarilla"];
  itemsRes = ["Esperar a que CARLA se ponga amarilla","Ir a la dirección e ingresar las credenciales de internet","Esperar a que CARLA se ponga verde","Grabar nuestra voz","Probar la voz"];
  async ngOnInit() {
    await this.shuffleOptions();
    await this.storage.create();
    this.presentAlert();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Atención',
      subHeader: 'Estás a punto de comenzar el cuestionario',
      message: 'Al dar en comenzar, el cronómetro comenzará. Buena suerte',
      backdropDismiss:false,
      buttons: [{
        text:'Continuar',
        role:'confirm',
        handler:()=>{
          this.startTimer();
          this.ok=true;
        }
      }
      ],
    });

    await alert.present();
  }
  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.items = ev.detail.complete(this.items);
  }
  toggleCheckbox(index: number) {
    this.p4Res[index] = !this.p4Res[index];
  }
  correctas:any;
  async submit(){
  if (await this.running) {
      clearInterval(this.timer);
      this.running = false;
    }
    if(this.p1=="3"){
      this.puntaje++;
      this.correctas=+'1';
    }else{
      this.correctas=+'0';
    }
    if(this.p2=="1"){
      this.puntaje++;
      this.correctas=+'1';
    }else{
      this.correctas=+'0';
    }
    
    if(this.items[0] == this.itemsRes[0] && this.items[1] == this.itemsRes[1] && this.items[2] == this.itemsRes[2] && this.items[3] == this.itemsRes[3] && this.items[4] == this.itemsRes[4]){
      this.puntaje++;
      this.correctas=+'1';
    }else{
      this.correctas=+'0';
    }
    if(this.p4Res[0] && !this.p4Res[1] && !this.p4Res[2] && this.p4Res[3]){
      this.puntaje++;
      this.correctas=+'1';
    }else{
      this.correctas=+'0';
    }
    if(this.p5 == 1){
      this.puntaje++;
      this.correctas=+'1';
    }else{
      this.correctas=+'0';
    }
    
    if(this.p6 == 4){
      this.puntaje++;
      this.correctas=+'1';
    }else{
      this.correctas=+'0';
    }
    
    if(this.p7 == 2){
      this.puntaje++;
      this.correctas=+'1';
    }else{
      this.correctas=+'0';
    }
    
    if(this.p8 == 1){
      this.puntaje++;
      this.correctas=+'1';
    }else{
      this.correctas=+'0';
    }
    
    if(this.p9 == 1){
      this.puntaje++;
      this.correctas=+'1';
    }else{
      this.correctas=+'0';
    }
    
    if(this.p10 == 3){
      this.puntaje++;
      this.correctas=+'1';
    }else{
      this.correctas=+'0';
    }
    
    if(this.p11 == 2){
      this.puntaje++;
      this.correctas=+'1';
    }else{
      this.correctas=+'0';
    }
    
    if(this.p12 == 1){
      this.puntaje++;
      this.correctas=+'1';
    }else{
      this.correctas=+'0';
    }
    
    if(this.p13 == 2){
      this.puntaje++;
      this.correctas=+'1';
    }else{
      this.correctas=+'0';
    }
    
    if(this.p14 == 1){
      this.puntaje++;
      this.correctas=+'1';
    }else{
      this.correctas=+'0';
    }
    
    if(this.p15 == 1){
      this.puntaje++;
      this.puntaje++;
      this.correctas=+'1';
    }else{
      this.correctas=+'0';
    }
    
    const route = ref(this.database,'users/'+ String(await this.storage.get('User')) +'/results');
    await set(route,{points:this.puntaje, time:this.minutes+':'+this.seconds});
    await set(ref(this.database,'users/'+String(await this.storage.get('User'))+'/state'),false);
    this.presentToast('top',"Prueba realizada \n Puntaje: "+this.puntaje+ "\n Tiempo: "+this.minutes+" minutos y "+this.seconds+' segundos',"success","checkmark-circle-outline");
    this.route.navigate(['home']);
  }
  async presentToast(position: 'top' | 'middle' | 'bottom', content:any, color:any,icon:any) {
    const toast = await this.toast.create({
      message: content,
      duration: 6000,
      position: position,
      color: color,
      icon:icon ,
    });

    await toast.present();
  }
}
