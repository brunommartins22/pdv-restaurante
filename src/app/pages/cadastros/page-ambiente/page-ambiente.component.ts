import { Component, OnInit } from "@angular/core";
import { CrudComponent, StringUtils } from 'padrao';
import { Mesa } from '../page-mesa/page-mesa.component';
import { MultiSelectItem, SelectItem } from 'primeng/primeng';

export class Ambiente {
    id: number = null;
    nomeAmbiente: string = null;
    quantidadeMesas: number = 0;
    listMesas: Array<Mesa> = new Array();
    ativo: boolean = true;

}
@Component({
    selector: 'app-page-ambiente',
    templateUrl: './page-ambiente.component.html',
    styles: [`
        :host ::ng-deep .ui-multiselected-item-token,
        :host ::ng-deep .ui-multiselected-empty-token {
            padding: 2px 4px;
            margin: 0 0.286em 0 0;
            display: inline-block;
            vertical-align:middle;
            height: 1.857em;
        }

        :host ::ng-deep .ui-multiselected-item-token {
            background: #007ad9;
            color: #ffffff;
        }

        :host ::ng-deep .ui-multiselected-empty-token {
            background: #d95f00;
            color: #ffffff;
        }
    `]
})

export class PageAmbienteComponent extends CrudComponent {

    dadosStatus: any = [];
    ambiente: Ambiente = new Ambiente();
    mesas: SelectItem[] = [];
    mesa: SelectItem;

    //********************* init methods ********************/
    private loadCampoOrdenacao() {
        this.campoSelecionadoOrdenacao = 'id';
        this.camposOrdenacao.push({ label: 'Código', value: 'id' });
        this.camposOrdenacao.push({ label: 'Ambiente', value: 'nomeAmbiente' });
        this.camposOrdenacao.push({ label: 'stutus', value: 'ativo' });
    }

    private loadListagemAmbientes() {
        this.cols = [{ field: 'id', header: 'Codigo', width: '80px' },
        { field: 'nomeAmbiente', header: 'Ambiente', width: '250px' },
        { field: 'quantidadeMesas', header: 'Nº de Mesas', width: '100px' }]
    }

    private loadStatusAmbiente() {
        this.dadosStatus = [];
        this.dadosStatus.push({ label: 'Ativo', value: true });
        this.dadosStatus.push({ label: 'Inativo', value: false });
    }

    private loadMesas() {
        this.httpUtilService.get("/mesas").subscribe(data => {

            if (data.json().hasOwnProperty('errorCode')) {
                this.showError(data.text());
            } else {
                this.mesas = [];
                for (let item of data.json()) {
                    this.mesa = { label: "Mesa " + item.numeroMesa + " - " + item.quantidadePessoas + " pessoa(s)", value: item, disabled: item.status==false };
                    
                    if (this.ambiente.listMesas != []) {
                        this.ambiente.listMesas.forEach(e => {
                            if (e.id == item.id) {
                             this.mesa.disabled=false;
                                return;   
                            }
                        });
                    } 
                    this.mesas.push(this.mesa);
                }
            }

        }, erro => {
            this.showError(erro.message);
        })
    }

    public loadStatusMesas(mesa) {
        console.log(mesa);

        // this.httpUtilService.get("/mesas/status/" + mesa.itemValue.id).subscribe(data => {
        //     console.log(data.json())
        //     if (data.json().hasOwnProperty("errorCode")) {
        //         this.showError(data.text());
        //     } else {
        //         const resp = data.json();
        //         if (resp.status) {
        //             this.showError("Mesa já está sendo utilizada em outro ambiente.");
        //         }
        //     }
        // }, erro => {
        //     this.showError(erro.message);
        // });
    }


    //********************* end methods ********************/

    ngOnInit() {
        this.objetoSelecionado = new Object();
        this.loadCampoOrdenacao();
        this.loadListagemAmbientes();
        super.iniciar('/ambientes');

        this.loadStatusAmbiente();
    }

    acaoInserir() {
        super.acaoInserir();
        this.ambiente = new Ambiente();
        this.loadMesas();
    }

    acaoAlterar() {
        super.acaoAlterar();
        this.ambiente = this.objetoSelecionado;
        this.loadMesas();
    }

    validar() {

        if (StringUtils.isEmpty(this.ambiente.nomeAmbiente)) {
            this.showError('Descrição do ambiente não informado.');
            return false;
        }

        if (this.ambiente.quantidadeMesas == 0) {
            this.showError('Numero de mesas não informado.');
            return false;
        }

        if (this.ambiente.listMesas == []) {
            this.showError('Nenhuma mesa selecionada.');
            return false;
        }

        this.ambiente.listMesas.forEach(m => {
            m.status = false;
        });

        this.objetoSelecionado = this.ambiente;
        return true;
    }


}
