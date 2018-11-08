import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortableTableDirective } from './layout/sortable-table.directive';
import { SortableColumnComponent } from "./layout/sortable-column.component";
import { TranslateModule } from '@ngx-translate/core';
import { PerunFooterComponent } from './layout/perun-footer/perun-footer.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { PerunHeaderComponent } from "./layout/perun-header/perun-header.component";
import { PerunSidebarComponent } from "./layout/perun-sidebar/perun-sidebar.component";
import { RouterModule } from "@angular/router";
import { PerunLoaderComponent } from './components/perun-loader/perun-loader.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule
  ],
  declarations: [
    SortableColumnComponent,
    SortableTableDirective,
    PerunHeaderComponent,
    PerunSidebarComponent,
    PerunFooterComponent,
    PerunLoaderComponent
  ],
  exports: [
    FontAwesomeModule,
    SortableColumnComponent,
    SortableTableDirective,
    TranslateModule,
    PerunHeaderComponent,
    PerunSidebarComponent,
    PerunFooterComponent,
    PerunLoaderComponent,
    FormsModule
  ]
})
export class SharedModule { }
