import { CrudComponent } from 'padrao';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-page-fornecedor',
    templateUrl: './page-fornecedor.component.html',

})
export class PageFornecedorComponent extends CrudComponent {

    listEndereco: any;
    display: boolean = true;
    item: any;
    endereco = {};
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

        this.cols = [
            { field: 'nomePessoa', header: 'Razão Social', width: '70px' },
            { field: 'nomeFantasia', header: 'Logradouro', width: '70px' },
            { field: 'cnpjCpf', header: 'CNPJ / CPF', width: '30px' },
            { field: 'ieRg', header: 'IE / RG', width: '20px' },
            { field: 'email', header: 'Email', width: '30px' },


            // { field: 'endereco', subfild: ' logradouro', header: 'Logradouro', width: '70px' },
            // { field: 'endereco', subfild: 'cep', header: 'Cep', width: '10px' },
            // { field: 'endereco', subfild: 'bairro', header: 'Bairro', width: '10px' },
            // { field: 'endereco', subfild: 'complemento', header: 'Complemento', width: '30px' },
            // { field: 'endereco', subfild: 'numero', header: 'numero', width: '10px' },
            // { field: 'endereco', subfild: 'cidade', header: 'cidade', width: '20px' },
            // { field: 'endereco', subfild: 'estado', header: 'estado', width: '10px' }
        ];



    }

    getListEndereco() {
        this.httpUtilService.get(this.urlControler + '/pessoa').subscribe(data => {
            this.listEndereco = data.json;
        });
    }



    limpaCamposTipoPessoa() {
        this.objetoSelecionado.cnpjCpf = null;
        this.objetoSelecionado.ieRg = null;
    }

    acaoAdd() {
        this.renderizarListagem = false;
        this.endereco = {};
    }


}
