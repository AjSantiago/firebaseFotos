import { Component } from '@angular/core';
import { FileItem } from 'src/app/models/file-items';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: [],
})
export class CargaComponent {
  estaSobreElemento = false;
  archivos: FileItem[] = [];

  constructor(public _cargaImagenes: CargaImagenesService) {}

  cargarImagenes() {
    this._cargaImagenes.cargarImagenesFirebase(this.archivos);
  }

  limpiarArchivos() {
    this.archivos = [];
  }
}
