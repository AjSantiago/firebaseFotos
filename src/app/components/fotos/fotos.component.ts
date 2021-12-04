import { Component } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { query, orderBy } from 'firebase/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styles: [],
})
export class FotosComponent {
  imgs: any[] = [];

  constructor(private firestore: Firestore) {
    const coleccion = collection(this.firestore, 'img');
    const ordenado = query(coleccion, orderBy('nombre'));

    collectionData(ordenado)
      .pipe(
        map((imgs) => {
          //this.imgs = [];
          this.imgs = imgs;
        })
      )
      .subscribe(() => {
        console.log(this.imgs);
      });
  }
}
