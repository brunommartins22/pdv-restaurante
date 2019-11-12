import { PageFornecedorComponent } from './pages/page-fornecedor/page-fornecedor.component';
import { PageSecaoComponent } from './pages/page-secao/page-secao.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard, PageUsuarioComponent } from 'padrao';
import { LoginComponent } from './pages/login/login.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PagePedidosComponent } from './pages/page-pedidos/page.pedidos.component';
import { RaizComponent } from './raiz/raiz.component';
import { PageDepartamentoComponent } from './pages/page-departamento/page-departamento.component';




export const routes: Routes = [

    {
        path: 'sys', component: RaizComponent,
        canActivate: [AuthenticationGuard],
        children: [
            { path: '', component: PageHomeComponent },
            { path: 'usuario', component: PageUsuarioComponent },
            { path: 'home-page', component: PageHomeComponent },
            { path: 'pedidos', component: PagePedidosComponent },
            { path: 'secao', component: PageSecaoComponent },
            { path: 'Departamento', component: PageDepartamentoComponent },
            { path: 'Fornecedor', component: PageFornecedorComponent }

        ]
    },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' });
