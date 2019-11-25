import { Component, OnInit } from "@angular/core";
import { CrudComponent, StringUtils } from 'padrao';

export class Ambiente {
    id: number = null;
    nomeAmbiente: string = null;
    quantidadeMesas: number = 0;
    ativo: boolean = true;

}
@Component({
    selector: 'app-page-ambiente',
    templateUrl: './page-ambiente.component.html'
})

export class PageAmbienteComponent extends CrudComponent {

    dadosStatus: any = [];
    ambiente: Ambiente = new Ambiente();

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

    }

    acaoAlterar() {
        super.acaoAlterar();
        this.ambiente = this.objetoSelecionado;
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

        this.objetoSelecionado = this.ambiente;
        return true;
    }


}
