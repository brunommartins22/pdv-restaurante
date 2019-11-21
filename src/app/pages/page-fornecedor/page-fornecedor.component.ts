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
    listaTelefone = [];
    listaOperadora = [];
    statusEndereco = [];
    statusTelefone = [];

    enderecoSelecionado: any = null;
    telefoneSelecionado: any = null;




    /*************************** init method address ****************************/

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
            // this.listaEstado.push({ label: 'Selecione ...', value: '' });
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

    /*************************** end method address ****************************/



    /*************************** init method fone ****************************/


    private loadStatusTelefone() {
        this.statusTelefone = new Array();
        this.statusTelefone.push({ label: 'Ativo', value: true }),
            this.statusTelefone.push({ label: 'Inativo', value: false });
    }

    loadTiposTelefone() {
        this.listaTelefone = new Array();
        this.listaTelefone.push({ label: 'Selecione...', value: '' }),
            this.listaTelefone.push({ label: '1 - Celular', value: '1' }),
            this.listaTelefone.push({ label: '2 - Telefone Fixo', value: '2' });

    }

    loadOperadoras() {
        this.listaOperadora = new Array();
        this.listaOperadora.push({ label: 'Selecione...', value: '' }),
            this.listaOperadora.push({ label: '1-Oi', value: '1' }),
            this.listaOperadora.push({ label: '2-Tim', value: '2' });
        this.listaOperadora.push({ label: '3-Vivo', value: '3' }),
            this.listaOperadora.push({ label: '4-Claro', value: '4' });
    }



    /*************************** end method fone ****************************/


    instance() {
        this.objetoSelecionado = new Object();
        this.objetoSelecionado.pessoa = new Object();
        this.objetoSelecionado.pessoa.tipoPessoa = 'JURIDICA';
        this.objetoSelecionado.pessoa.listEndereco = [];
        this.objetoSelecionado.pessoa.listTelefone = [];
        this.objetoSelecionado.pessoa.listaOperadora = [];
        this.enderecoSelecionado = new Object();
        this.telefoneSelecionado = new Object();
        this.telefoneSelecionado.nmOperadora = new Object();

    }

    ngOnInit() {

        document.body.classList.remove('body-img');


        super.iniciar('/fornecedores');

        this.campoSelecionadoOrdenacao = 'id';
        this.camposOrdenacao.push({ label: 'Código', value: 'id' });
        this.camposOrdenacao.push({ label: 'Razão Social', value: 'pessoa.nomePessoa' });
        this.camposOrdenacao.push({ label: 'Nome Fantasia', value: 'pessoa.nomeFantasia' });

        this.cols = [
            { field: 'id', header: 'ID', width: '10px' },
            { field: 'pessoa', subfield: 'nomePessoa', header: 'Razão Social', width: '70px' },
            { field: 'pessoa', subfield: 'nomeFantasia', header: 'Nome Fantasia', width: '70px' },
            { field: 'pessoa', subfield: 'cpfCnpj', header: 'CNPJ / CPF', width: '30px' },
            { field: 'pessoa', subfield: 'ieRg', header: 'IE / RG', width: '20px' },
            { field: 'pessoa', subfield: 'email', header: 'Email', width: '30px' },
        ];


        this.loadPessoas();
        this.loadStatusEndereco();
        this.carregarEstados();
        this.loadStatusTelefone();
        this.loadTiposTelefone();
        this.loadOperadoras();

    }


    /****************** Dialog Endereco *********************/


    adicionarEndereco() {

        this.enderecoSelecionado = new Object();
        this.enderecoSelecionado.estado = this.listaEstado[0];
        this.carregarCidades();
        this.enderecoSelecionado.ativo = true;
        this.isVisibleEndereco = true;
    }

    editarEndereco() {
        if (this.enderecoSelecionado.id != null
            && this.enderecoSelecionado.id !== undefined) {
            this.carregarCidades();
            this.isVisibleEndereco = true;
        } else {
            this.showWarn('Selecione um Endereço!');
        }

    }

    removerEndereco() {

        if (this.enderecoSelecionado.id != null && this.enderecoSelecionado.id !== undefined) {
            this.confirmationService.confirm({
                message: 'Confirma a remoção do Endereço ?',
                accept: () => {
                    this.objetoSelecionado.pessoa.listEndereco =  this.objetoSelecionado.pessoa.listEndereco.filter(element =>
                        element.id != this.enderecoSelecionado.id
                    );
                },
                reject: () => {
                    return;
                }
            });

        } else {
            this.showWarn('Selecione um Endereço!');
        }

    }

    salvarEndereco() {
        if (this.enderecoSelecionado.id != null && this.enderecoSelecionado.id != undefined) {
            this.objetoSelecionado.pessoa.listEndereco.forEach(element => {
                if (element.id == this.enderecoSelecionado.id) {
                    element = this.enderecoSelecionado;
                }
            });
        } else {
            this.objetoSelecionado.pessoa.listEndereco.push(this.enderecoSelecionado);
            this.enderecoSelecionado = new Object();
        }

        this.isVisibleEndereco = false;
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
        this.telefoneSelecionado.ativo = true;
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
