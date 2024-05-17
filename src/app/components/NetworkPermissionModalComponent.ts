import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-network-permission-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Permissão de Rede</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Fechar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item>
        <ion-label>
          Este aplicativo precisa de acesso à rede para funcionar corretamente.
        </ion-label>
      </ion-item>
      <ion-footer>
        <ion-button expand="full" (click)="grantPermission()">Conceder Permissão</ion-button>
      </ion-footer>
    </ion-content>
  `
})
export class NetworkPermissionModalComponent {
  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss({ granted: false });
  }

  grantPermission() {
    this.modalController.dismiss({ granted: true });
  }
}
