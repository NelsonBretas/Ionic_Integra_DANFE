import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ScannotaPage } from '../pages/scannota/scannota';
import { DignotaPage } from '../pages/dignota/dignota';
import { ProdutosPage } from '../pages/produtos/produtos';
import { BuscaprdPage } from '../pages/buscaprd/buscaprd';
import { DetprodPage } from '../pages/detprod/detprod';
import { IncprdPage } from '../pages/incprd/incprd';
import { AltprdPage } from '../pages/altprd/altprd';
import { BuscacomplPage } from '../pages/buscacompl/buscacompl';
import { ComplPage } from '../pages/compl/compl';
import { DetcomplPage } from '../pages/detcompl/detcompl';
import { InccomplPage } from '../pages/inccompl/inccompl';
import { AltcomplPage } from '../pages/altcompl/altcompl';
import { BuscaforPage } from '../pages/buscafor/buscafor';
import { FornecedorPage } from '../pages/fornecedor/fornecedor';
import { IncforPage } from '../pages/incfor/incfor';
import { AltforPage } from '../pages/altfor/altfor';
import { DetforPage } from '../pages/detfor/detfor';




import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { CentralProvider } from '../providers/central/central';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ScannotaPage,
    DignotaPage,
    ProdutosPage,
    BuscaprdPage,
    DetprodPage,
    IncprdPage,
    AltprdPage,
    BuscacomplPage,
    ComplPage,
    DetcomplPage,
    InccomplPage,
    AltcomplPage,
    BuscaforPage,
    FornecedorPage,
    IncforPage,
    AltforPage,
    DetforPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ScannotaPage,
    DignotaPage,
    ProdutosPage,
    BuscaprdPage,
    DetprodPage,
    IncprdPage,
    AltprdPage,
    BuscacomplPage,
    ComplPage,
    DetcomplPage,
    InccomplPage,
    AltcomplPage,
    BuscaforPage,
    FornecedorPage,
    IncforPage,
    AltforPage,
    DetforPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CentralProvider
  ]
})
export class AppModule {}
