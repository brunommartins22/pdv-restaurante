import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard, PageUsuarioComponent } from 'padrao';
import { LoginComponent } from './pages/login/login.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PagePedidosComponent } from './pages/page-pedidos/page.pedidos.component';
import { RaizComponent } from './raiz/raiz.component';




export const routes: Routes = [

    {
        path: 'sys', component: RaizComponent,
        canActivate: [AuthenticationGuard],
        children: [
            { path: '', component: PageHomeComponent },
            { path: 'usuario', component: PageUsuarioComponent },
            { path: 'home-page', component: PageHomeComponent },
            { path: 'pedidos', component: PagePedidosComponent }

        ]
    },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' });
