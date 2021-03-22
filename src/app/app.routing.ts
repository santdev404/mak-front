//Imports necesarios
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Importar componentes
import { HomeComponent } from './components/home/home.component';
import { BookNewComponent } from './components/book-new/book-new.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';

import { ListComponent } from './components/list/list.component';

import { ErrorComponent } from './components/error/error.component';

//Definir las rutas
const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'inicio', component: HomeComponent},
    {path: 'crear-libro', component: BookNewComponent},
    {path: 'detalle-libro/:id', component: BookDetailComponent},
    {path: 'editar-libro/:id', component: BookEditComponent},
    {path: 'list', component: ListComponent},
    {path: '**', component: ErrorComponent}
];

//Exportar configuracion
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);