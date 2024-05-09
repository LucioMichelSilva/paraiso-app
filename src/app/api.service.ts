import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getClientes() {
    return this.http.get<any[]>('http://localhost:3001/clients');
  }

  getServicos() {
    return this.http.get<any[]>('http://localhost:3001/services');
  }

  enviar(clienteId: number, servicoId: number, foto: File) {
    const formData = new FormData();
    formData.append('image', foto);
    formData.append('clientId', clienteId.toString());
    formData.append('serviceId', servicoId.toString());

    return this.http.post('http://localhost:3001/images', formData);
  }
}
