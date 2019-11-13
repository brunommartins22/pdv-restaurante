import { CrudComponent } from 'padrao';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-page-fornecedor',
    templateUrl: './page-fornecedor.component.html',

})
export class PageFornecedorComponent extends CrudComponent {

    pessoafisica = [
        { label: 'Pessoa Fisica', value: 'FISICA' },
        { label: 'Pessoa Juridica', value: 'JURIDICA' },

    ];

    instance() {
        this.objetoSelecionado = new Object();
        this.objetoSelecionado.pessoa = new Object();
    }

    ngOnInit() {

        document.body.classList.remove('body-img');
        super.iniciar('/fornecedores');



    }

    limpaCamposTipoPessoa() {
        this.objetoSelecionado.cnpjCpf = null;
        this.objetoSelecionado.ieRg = null;
    }

}
