import { Component } from "@angular/core";
import { CrudComponent } from 'padrao';

@Component({
    selector: 'app-page-ambiente',
    templateUrl: './page-ambiente.component.html'
})


export class PageAmbienteComponent extends CrudComponent {

    dadosStatus: any = [];

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

        this.objetoSelecionado = {
            id: null,
            nomeAmbiente: '',
            quatidadeMesas: 0,
            ativo: true
        };
    }


}