import { CrudComponent } from 'padrao';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-page-fornecedor',
    templateUrl: './page-fornecedor.component.html',

})
export class PageFornecedorComponent extends CrudComponent {



    ngOnInit() {

        document.body.classList.remove('body-img');

        super.iniciar('/fornecedores');
    }

}
