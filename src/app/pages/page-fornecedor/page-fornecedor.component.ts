import { CrudComponent, StringUtils } from 'padrao';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-page-fornecedor',
    templateUrl: './page-fornecedor.component.html',

})
export class PageFornecedorComponent extends CrudComponent {

    listaEstado: any;
    listaCidade: any;
    cidade: any;


    isVisibleEndereco: boolean = false;
    isVisibleTelefone: boolean = false;
    progressSpinner: boolean;
    errocep: boolean;

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

    carregarEstados() {
        this.httpUtilService.get('/estados').subscribe(data => {
            this.listaEstado = new Array();
            this.listaEstado.push({ label: 'Selecione ...', value: null });
            this.listaEstado = data.json();
            this.carregarCidades();
        });
    }

    carregarCidades() {
        this.httpUtilService.get('/cidades/findByUf/' + this.enderecoSelecionado.estado.id).subscribe(data => {
            this.listaCidade = data.json();
        }, error => {
            this.progressSpinner = false;
        });
    }

    carregarEnderecoPeloCep() {
        let endereco = undefined;
        this.progressSpinner = true;
        this.errocep = false;

        if (StringUtils.isEmpty(this.enderecoSelecionado.cep)) {
            this.enderecoSelecionado = new Object();
            this.progressSpinner = false;
            return;
        }

        this.httpUtilService.http.get('https://viacep.com.br/ws/' + StringUtils.extraiNumeros(this.enderecoSelecionado.cep) + '/json')
            .subscribe(data => {
                endereco = data.json();
                if (endereco.ibge === undefined) {
                    this.progressSpinner = false;
                    this.errocep = true;
                } else {
                    this.enderecoSelecionado.logradouro = endereco.logradouro;
                    this.enderecoSelecionado.complemento = endereco.complemento;
                    this.enderecoSelecionado.bairro = endereco.bairro;
                    this.errocep = false;

                    this.httpUtilService.get('/cidades/' + endereco.ibge).subscribe(data => {
                        const cidade = data.json();
                        this.enderecoSelecionado.cidade = cidade;
                        this.enderecoSelecionado.estado = cidade.cuF;
                        this.carregarCidades();
                        this.progressSpinner = false;
                    });
                }

            }, error => {
                this.progressSpinner = false;
                this.errocep = true;
            });
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
        this.carregarEstados();

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
