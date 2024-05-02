import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
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
  
  constructor(private apiService: ApiService,private loadingController: LoadingController) {}  

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
    this.apiService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    });

    this.apiService.getServicos().subscribe(servicos => {
      this.servicos = servicos;
    });
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
