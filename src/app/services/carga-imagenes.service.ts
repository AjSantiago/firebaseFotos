import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { FileItem } from '../models/file-items';

@Injectable({
  providedIn: 'root',
})
export class CargaImagenesService {
  private CARPETA_IMAGENES = 'img';

  constructor(private db: AngularFirestore) {}

  cargarImagenesFirebase(imagenes: FileItem[]) {
    const storageRef = firebase.app().storage().ref(); //Última versión

    //Se obtiene imagen por imagen
    for (const item of imagenes) {
      item.estaSubiendo = true;
      if (item.progreso >= 100) continue; //El archivo ya se subió

      //Si no se ha subido completo
      const uploadTask: firebase.storage.UploadTask = storageRef
        .child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`) //Almacenar algo en una ubicación
        .put(item.archivo); //Archivo físico

      //Se dispara cada que cambia el estado
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) =>
          (item.progreso =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100),
        (error) => console.error('Error al subir', error),
        async () => {
          console.log('Imagen cargada correctamente');
          item.url = await uploadTask.snapshot.ref.getDownloadURL();
          item.estaSubiendo = false;
          this.guardarImagen({ nombre: item.nombreArchivo, url: item.url });
        }
      );
    }
  }

  private guardarImagen(imagen: { nombre: string; url: string }) {
    this.db.collection(`/${this.CARPETA_IMAGENES}`).add(imagen);
  }
}
