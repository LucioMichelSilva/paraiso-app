import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { LoadingController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Network } from '@capacitor/network';
import { NetworkPermissionModalComponent } from '../components/NetworkPermissionModalComponent';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [AndroidPermissions]
})
export class HomePage implements OnInit {

  clientes: any[] = [];
  servicos: any[] = [];
  selectedClienteId?: number | 0;
  selectedServicoId?: number | 0;
  imageUrls: string[] = [];
  errorMessage: string = '';
  errorMM: String = '';
  imagePath: string | null = null; 
  
  constructor(
    private apiService: ApiService,
    private loadingController: LoadingController,
    private androidPermissions: AndroidPermissions,
    private modalController: ModalController,
    private toastController: ToastController
  ) {  }  

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 10000,
      position: 'bottom'
    });
    await toast.present();
  }

  async EnviarGo() {
    if (!this.selectedClienteId || !this.selectedServicoId) {
      console.log('Campo nome não preenchido');
      this.errorMessage = 'Campo obrigatório*';
    } else if (this.imageUrls.length === 0) {
      console.log('Campos preenchidos, mas imagem não selecionada');
      this.errorMessage = '';
      this.errorMM = 'Selecione uma imagem*';
    } else {
      console.log('Formulário válido');
      this.errorMessage = ' ';
      this.errorMM = '';

      const imagePath = this.imagePath;
      if (!imagePath) {
        console.error('Caminho da imagem inválido.');
        return;
      }

      await this.enviarDadosParaAPI(imagePath);
      console.log("passou")
    }
  }
  
  async showLoading() {
      const loading = await this.loadingController.create({
        message: 'Enviando...',
        duration: 2000,
      });

      await loading.present();
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      this.selectedClienteId = 0;
      this.selectedServicoId = 0;
      this.imageUrls = [];
      await loading.dismiss();
      this.sendMessageAfterTimeout();
     
  }

  sendMessageAfterTimeout() {
    const mensagem = 'Dados Enviados com Sucesso!';
    alert(mensagem);
  }

  ngOnInit() {

    this.checkPermissions();

    this.apiService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    });

    this.apiService.getServicos().subscribe(servicos => {
      this.servicos = servicos;
    });
  }

  async checkPermissions() {
    try {
      this.presentToast("iniciou validação internet")
      const permission = await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_NETWORK_STATE);
      if (permission.hasPermission) {
        //this.presentToast("tem permissão")
        this.checkInternet();
      } else {
        //this.presentToast("NÂO tem permissão")
        this.showPermissionModal();
      }
    } catch (error) {
      //this.presentToast(error + "")
      console.error('Error checking permission:', error);
    }
  }

  async showPermissionModal() {
    const modal = await this.modalController.create({
      component: NetworkPermissionModalComponent
    });
    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.granted) {
        this.requestPermissions();
      } else {
        console.log('Permissão de acesso à rede negada pelo usuário.');
      }
    });
    await modal.present();
  }

  async requestPermissions() {
    try {
      const result = await this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_NETWORK_STATE);
      if (result.hasPermission) {
        this.checkInternet();
      } else {
        //this.presentToast('Permissão de acesso à rede negada')
      }
    } catch (error) {
      //this.presentToast('Error requesting permission:')
    }
  }

  async checkInternet() {
    const status = await Network.getStatus();
    if (status.connected) {
      //this.presentToast('Conexão com a internet está disponível.')
    } else {
      //this.presentToast('Não há conexão com a internet.')
    }
  }

  async enviarDadosParaAPI(imagePath: string) {

    const response = await fetch(imagePath);
    const blob = await response.blob();
  
    this.apiService.enviar(this.selectedClienteId!, this.selectedServicoId!, blob as File)
    .subscribe(result => {
      console.log('Foto enviada!', result);
      ///this.sendMessageAfterTimeout();
    }, error => {
      console.error('Erro ao enviar foto:', error);
    });
    await this.showLoading();
  }  

  async tirarEnviarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
  
    if (image.webPath) {
      this.imageUrls.push(image.webPath);
      this.imagePath = image.webPath; 
      return image.webPath; 
    }
  
    return null;
  }
}
