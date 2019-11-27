import { CrudComponent, HttpUtilService, StringUtils } from 'padrao';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-page-cliente',
    templateUrl: './page-cliente.component.html',

})
export class PageClienteComponent extends CrudComponent {

    listaCidades: any;


    listaPessoas = [];

    progressSpinner: boolean;
    errocep: boolean;


    enderecoSelecionado: any = new Object();



    private loadPessoas() {
        this.listaPessoas = new Array();
        this.listaPessoas.push({ label: 'Pessoa Física', value: 'FISICA' });
        this.listaPessoas.push({ label: 'Pessoa jurídica', value: 'JURIDICA' });

    }

    instance() {
        this.objetoSelecionado = new Object();
        this.objetoSelecionado.pessoa = new Object();
        this.objetoSelecionado.pessoa.tipoPessoa = 'JURIDICA';

    }

    // ************************* init Method Address ****************************


    carregarCidades() {
        this.httpUtilService.get('/cidades/findByUF/' + this.enderecoSelecionado.estado.id).subscribe(data => {
            this.listaCidades = data.json();
        }, erro => {
            this.progressSpinner = false;
        });
    }

    carregarEnderecoPeloCep() {

        let endereco = undefined;
        this.progressSpinner = true;
        this.errocep = false;

        this.httpUtilService.http.get('https://viacep.com.br/ws/' + StringUtils.extraiNumeros(this.enderecoSelecionado.cep) + '/json')
            .subscribe(data => {
                endereco = data.json();
                if (endereco.ibge === undefined) {
                    this.progressSpinner = false;
                    this.errocep = false;
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

            }, erro => {
                this.progressSpinner = false;
                this.errocep = true;
            });

    }

    //************************** End Method Address  ****************************

    ngOnInit() {

        super.iniciar('/clientes');

        this.campoSelecionadoOrdenacao = 'id';
        this.camposOrdenacao.push({ label: 'código', value: 'id' });
        this.camposOrdenacao.push({ label: 'Razão Social', value: 'pessoa.nomePessoa' });
        this.camposOrdenacao.push({ label: 'Nome Fantasia', value: 'pessoa.nomeFatasia' });

        this.cols = [
            { field: 'id', header: 'ID', width: '10px' },
            { field: 'pessoa', subfield: 'nomePessoa', header: 'Razão Social', width: '70px' },
            { field: 'pessoa', subfield: 'nomeFantasia', header: 'Nome Fantasia', width: '70px' },
            { field: 'pessoa', subfield: 'cpfCnpj', header: 'CNPJ / CPF', width: '30px' },
            { field: 'pessoa', subfield: 'ieRg', header: 'IE / RG', width: '20px' },
            { field: 'pessoa', subfield: 'email', header: 'Email', width: '30px' }
        ];

        this.loadPessoas();
    }

    // Validar() {
    //     if (StringUtils.isEmpty(this.objetoSelecionado.pessoa.cpfCnpj)) {
    //         this.showError('CNPJ não Informado!');
    //         this.setarFocus('nome_input');
    //         return false;
    //     }

    //     if (StringUtils.isEmpty(this.objetoSelecionado.pessoa.nomePessoa)) {
    //         this.showError('Razão Social Não Informada');
    //         this.setarFocus('login_input');
    //         return false;
    //     }

    //     if (StringUtils.isEmpty(this.objetoSelecionado.pessoa.nomeFantasia)) {
    //         this.showError('Nome fantasia não informado');
    //         this.setarFocus('login_input');
    //         return false;
    //     }

    //     if (StringUtils.isEmpty(this.objetoSelecionado.pessoa.ieRg)) {
    //         this.showError('Rg ou ie do Usuário não informado!');

    //     } else {
    //         return true;
    //     }

    // }

}
