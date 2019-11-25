import { Component } from "@angular/core";
import { CrudComponent } from 'padrao';
import { PageAmbienteComponent, Ambiente } from '../page-ambiente/page-ambiente.component';
import { SelectItem } from 'primeng/api';

export class Mesa {
    id: number = null;
    numeroMesa: number = 0;
    quantidadePessoas: number = 0;
    listaAmbientes: Array<Ambiente> = new Array();
    ativo: boolean = true;
}

@Component({
    selector: 'app-page-mesa',
    templateUrl: './page-mesa.component.html'
})

export class PageMesaComponent extends CrudComponent {

    mesa: Mesa = new Mesa();
    dadosStatus: any = [];
    ambientes = [];


    //********************* init Methods ********************/
    private loadCampoOrdenacao() {
        this.campoSelecionadoOrdenacao = 'id';
        this.camposOrdenacao.push({ label: 'Código', value: 'id' });
        this.camposOrdenacao.push({ label: 'Numero da Mesa', value: 'numeroMesa' });
    }

    private loadListagemMesas() {
        this.cols = [{ field: 'id', header: 'Codigo', width: '80px' },
        { field: 'numeroMesa', header: 'Numero da Mesa', width: '250px' },
        { field: 'quantidadePessoas', header: 'Quantidade de Pessoas', width: '250px' }]
    }

    private loadStatusMesa() {
        this.dadosStatus = [];
        this.dadosStatus.push({ label: 'Ativo', value: true });
        this.dadosStatus.push({ label: 'Inativo', value: false });
    }

    private loadAmbientes() {
        this.httpUtilService.get("/ambientes").subscribe(data => {

            if (data.json().hasOwnProperty('errorCode')) {
                this.showError(data.text());
            } else {
                this.ambientes = [];
                for (let item of data.json()) {
                    this.ambientes.push({ label: item.nomeAmbiente, value: item });
                }
            }

        }, erro => {
            this.showError(erro.message);
        })
    }

    //******************** end Methods **********************/


    ngOnInit() {
        this.objetoSelecionado = new Object();
        this.loadCampoOrdenacao();
        this.loadListagemMesas();
        super.iniciar('/mesas');
    }

    acaoInserir() {
        super.acaoInserir();
        this.mesa = new Mesa();
        this.loadStatusMesa();
        this.loadAmbientes();
    }

    acaoAlterar() {
        super.acaoAlterar();
        this.loadAmbientes();
        this.mesa = this.objetoSelecionado;
    }

    validar() {

        if (this.mesa.numeroMesa == 0) {
            this.showError('Número da mesa não informado.');
            return false;
        }

        if (this.mesa.quantidadePessoas == 0) {
            this.showError('Quantidade de Pessoas não informado.');
            return false;
        }

        if (this.mesa.listaAmbientes == []) {
            this.showError("Nenhum ambiente informado.");
            return false;
        }

        this.objetoSelecionado = this.mesa;
        return true;
    }

}
