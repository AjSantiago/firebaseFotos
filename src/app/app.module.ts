import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeatureRoutingModule } from './app.routes';
//Firebase
import { environment } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
//Servicios
import { CargaImagenesService } from './services/carga-imagenes.service';
//Directivas
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';
//Componentes
import { AppComponent } from './app.component';
import { CargaComponent } from './components/carga/carga.component';
import { FotosComponent } from './components/fotos/fotos.component';

@NgModule({
  declarations: [
    AppComponent,
    CargaComponent,
    FotosComponent,
    NgDropFilesDirective,
  ],
  imports: [
    BrowserModule,
    FeatureRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AngularFirestoreModule,
  ],
  providers: [CargaImagenesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
