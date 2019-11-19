import { CrudComponent } from 'padrao';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-page-fornecedor',
    templateUrl: './page-fornecedor.component.html',

})
export class PageFornecedorComponent extends CrudComponent {

    isVisibleEndereco: boolean = false;
    isVisibleTelefone: boolean = false;

    listaPessoas = [];
    statusEndereco = [];

    enderecoSelecionado: any = null;
    telefoneSelecionado: any = null;


    /*************************** init method ****************************/

    private loadPessoas() {
        this.listaPessoas = new Array();
        this.listaPessoas.push({ label: 'Pessoa Fisica', value: 'FISICA' }),
            this.listaPessoas.push({ label: 'Pessoa Juridica', value: 'JURIDICA' });
    }

    private loadStatusEndereco() {
        this.statusEndereco = new Array();
        this.statusEndereco.push({ label: 'Ativo', value: true }),
            this.statusEndereco.push({ label: 'Inativo', value: false });
    }

    /*************************** end method ****************************/

    instance() {
        this.objetoSelecionado = new Object();
        this.objetoSelecionado.pessoa = new Object();
        this.objetoSelecionado.pessoa.tipoPessoa = 'JURIDICA';
        this.objetoSelecionado.pessoa.listEndereco = new Array();
        this.objetoSelecionado.pessoa.listTelefone = new Array();
        this.enderecoSelecionado = new Object();
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
        ];

        this.loadPessoas();
        this.loadStatusEndereco();

    }

    acaoAdd() {
        this.renderizarListagem = false;

    }

    /****************** Dialog Endereco *********************/

    adicionarEndereco() {
        this.enderecoSelecionado = new Object();
        this.enderecoSelecionado.ativo = true;
        this.isVisibleEndereco = true;
    }

    editarEndereco() {
        this.isVisibleEndereco = true;
    }

    removerEndereco() {
        this.isVisibleEndereco = true;
    }


    onRowSelectEndereco(event) {
        this.enderecoSelecionado = event.data;
    }

    onRowUnselectEndereco(event) {
        this.enderecoSelecionado = event.data;
    }


    /****************** Dialog Telefone *********************/

    adicionarTelefone() {
        this.telefoneSelecionado = new Object();
        this.isVisibleTelefone = true;
    }

    editarTelefone() {
        this.isVisibleTelefone = true;
    }

    removerTelefone() {
        this.isVisibleTelefone = true;
    }

    onRowSelectTelefone(event) {
        this.telefoneSelecionado = event.data;
    }

    onRowUnselectTelefone(event) {
        this.telefoneSelecionado = event.data;
    }


}
