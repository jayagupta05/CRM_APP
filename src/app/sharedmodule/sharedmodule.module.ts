import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { IonicModule } from '@ionic/angular';
import { LoaderComponent } from 'src/app/common/loader/loader.component';
import { SidemenuPage } from 'src/app/common/sidemenu/sidemenu.page'
@NgModule({
  declarations: [HeaderComponent, LoaderComponent, SidemenuPage],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [HeaderComponent, LoaderComponent, SidemenuPage]
})
export class SharedmoduleModule { }
