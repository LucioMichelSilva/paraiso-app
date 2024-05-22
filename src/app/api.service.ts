import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //http://localhost:3001
  public url: string = "http://192.168.15.94:3001";

  constructor(private http: HttpClient, private toastController: ToastController) {}

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 10000,
      position: 'bottom'
    });
    await toast.present();
  }

  getClientes() {
    return this.http.get<any[]>(this.url +'/clients')
    /*.pipe(
      catchError(error => {
        //this.presentToast("clientes: " + error);
        return this.handleError(error);
      })
    );*/
  }

  getServicos() {
    
    return this.http.get<any[]>(this.url + '/services')
   /* .pipe(
      catchError(error => this.handleErrorWithToast(error, 'Erro ao buscar serviços'))
    );*/
  }

  enviar(clienteId: number, servicoId: number, foto: File) {
    const formData = new FormData();
    formData.append('image', foto);
    formData.append('clientId', clienteId.toString());
    formData.append('serviceId', servicoId.toString());

    return this.http.post(this.url + '/images', formData)
    /*.pipe(
      catchError(error => {
        //this.presentToast("enviar: " + error);
        return this.handleError(error);
      })
    );*/
  }

  /*private handleErrorWithToast(error: HttpErrorResponse, userMessage: string) {
    let errorMessage = userMessage;

    if (error.error instanceof ErrorEvent) {
      // Erro no cliente ou na rede
      errorMessage += `: ${error.error.message}`;
    } else {
      // Erro no servidor
      errorMessage += `: Código ${error.status} - ${error.message}`;
      if (error.error && error.error.message) {
        errorMessage += ` - ${error.error.message}`;
      }
    }

    this.presentToast(errorMessage);
    return throwError(errorMessage);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API call failed:', error);
    return throwError('Something went wrong; please try again later.');
  }*/
}
