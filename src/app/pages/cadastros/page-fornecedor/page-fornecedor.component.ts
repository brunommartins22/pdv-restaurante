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
    selectTipo = [];

    enderecoSelecionado: any = new Object();
    enderecoTabela: any;
    indexEndereco: any = null;
    telefoneSelecionado: any = new Object();
    telefoneTabela: any;
    indexTelefone: any = null;






    /*************************** init method address ****************************/

    private loadPessoas() {
        this.listaPessoas = new Array();
        this.listaPessoas.push({ label: 'Pessoa Física', value: 'FISICA' }),
            this.listaPessoas.push({ label: 'Pessoa Jurídica', value: 'JURIDICA' });
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
            this.enderecoSelecionado.estado = this.listaEstado[0];
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
            this.listaOperadora.push({ label: '1-Oi', value: 'Oi' }),
            this.listaOperadora.push({ label: '2-Tim', value: 'Tim' });
        this.listaOperadora.push({ label: '3-Vivo', value: 'Vivo' }),
            this.listaOperadora.push({ label: '4-Claro', value: 'Claro' });
    }



    /*************************** end method fone ****************************/


    instance() {
        this.objetoSelecionado = new Object();
        this.objetoSelecionado.pessoa = new Object();
        this.objetoSelecionado.pessoa.tipoPessoa = 'JURIDICA';
        this.objetoSelecionado.pessoa.listEndereco = [];
        this.objetoSelecionado.pessoa.listaTelefone = [];
        this.objetoSelecionado.pessoa.listaOperadora = [];
        this.enderecoSelecionado = new Object();
        this.telefoneSelecionado = new Object();
        this.telefoneSelecionado.nmOperadora = new Object();

    }

    ngOnInit() {

        // document.body.classList.remove('body-img');


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


    validar() {

        if (StringUtils.isEmpty(this.objetoSelecionado.pessoa.cpfCnpj)) {
            this.showError("CNPJ não informado!")
            this.setarFocus("nome_input");
            return false;
        }

        if (StringUtils.isEmpty(this.objetoSelecionado.pessoa.nomePessoa)) {
            this.showError("Razão Social não Informado!")
            this.setarFocus("login_input");
            return false;
        }

        if (StringUtils.isEmpty(this.objetoSelecionado.pessoa.nomeFantasia)) {
            this.showError("Nome Fantasia não Informado!")
            this.setarFocus("login_input");
            return false;
        }

        if (StringUtils.isEmpty(this.objetoSelecionado.pessoa.ieRg)) {
            this.showError("Rg ou ie do Usuário não informado!")
            this.setarFocus("senha_input");
            return false;

        }
        else {
            return true;
        }
    }


    /****************** Dialog Endereco *********************/


    adicionarEndereco() {

        this.enderecoSelecionado = new Object();
        this.enderecoSelecionado.estado = this.listaEstado[0];
        this.carregarCidades();
        this.enderecoSelecionado.ativo = true;
        this.isVisibleEndereco = true;
        this.indexEndereco = null;
        this.enderecoTabela = null;

    }


    editarEndereco() {
        if (this.enderecoSelecionado.logradouro != null
            && this.enderecoSelecionado.logradouro !== undefined) {
            this.carregarCidades();
            this.isVisibleEndereco = true;
        } else {
            this.showWarn('Selecione um Endereço!');
        }

    }

    removerEndereco() {

        if (this.indexEndereco != null && this.indexEndereco != undefined) {
            this.confirmationService.confirm({
                message: 'Confirma a remoção do Endereço ?',
                accept: () => {
                    this.objetoSelecionado.pessoa.listEndereco.splice(this.indexEndereco, 1);
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
        if (this.indexEndereco != null && this.indexEndereco != undefined) {
            // this.objetoSelecionado.pessoa.listEndereco.forEach(element => {
            //     if (element.id == this.enderecoSelecionado.id) {
            //         element = this.enderecoSelecionado;
            //     }
            // });
            this.objetoSelecionado.pessoa.listEndereco[this.indexEndereco] = this.enderecoSelecionado;
            this.enderecoTabela = this.enderecoSelecionado;

        } else {
            this.objetoSelecionado.pessoa.listEndereco.push(this.enderecoSelecionado);
            this.enderecoSelecionado = new Object();
        }

        this.isVisibleEndereco = false;
    }


    onRowSelectEndereco(event) {
        this.indexEndereco = event.index;
        this.enderecoSelecionado = event.data;
        // console.log(this.indexEndereco);
        // console.log(event.index);
        // console.log(JSON.stringify(event));
    }

    onRowUnselectEndereco(event) {

        this.indexEndereco = null;
    }

    /****************** Dialog Telefone *********************/

    adicionarTelefone() {
        this.telefoneSelecionado = new Object();
        this.telefoneSelecionado.tipo = this.listaTelefone[0];
        this.telefoneSelecionado.ativo = true;
        this.isVisibleTelefone = true;
        this.indexTelefone = null;
        this.telefoneTabela = null;
    }

    editarTelefone() {
        if (this.telefoneSelecionado.tipo != null
            && this.telefoneSelecionado.tipo !== undefined) {
            this.isVisibleTelefone = true;
        } else {
            this.showWarn('Selecione um Telefone!');
        }
    }

    removerTelefone() {

        if (this.indexTelefone != null && this.indexTelefone != undefined) {
            this.confirmationService.confirm({
                message: 'Confirma a remoção do Endereço ?',
                accept: () => {
                    this.objetoSelecionado.pessoa.listaTelefone.splice(this.indexTelefone, 1);
                },
                reject: () => {
                    return;
                }
            });

        } else {
            this.showWarn('Selecione um Endereço!');
        }

    }

    salvarTelefone() {
        if (this.indexTelefone != null && this.indexTelefone != undefined) {
            // this.objetoSelecionado.pessoa.listEndereco.forEach(element => {
            //     if (element.id == this.enderecoSelecionado.id) {
            //         element = this.enderecoSelecionado;
            //     }
            // });
            this.objetoSelecionado.pessoa.listaTelefone[this.indexTelefone] = this.telefoneSelecionado;
            this.telefoneTabela = this.telefoneSelecionado;

        } else {
            this.objetoSelecionado.pessoa.listaTelefone.push(this.telefoneSelecionado);
            this.telefoneSelecionado = new Object();
        }

        this.isVisibleTelefone = false;
    }

    onRowSelectTelefone(event) {
        this.indexTelefone = event.index;
        this.telefoneSelecionado = event.data;
        // console.log(this.indexEndereco);
        // console.log(event.index);
        // console.log(JSON.stringify(event));
    }

    onRowUnselectTelefone(event) {
        this.indexTelefone = null;
    }


}
