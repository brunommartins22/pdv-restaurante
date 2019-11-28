import { Component } from "@angular/core";
import { CrudComponent } from 'padrao';
import { PageAmbienteComponent, Ambiente } from '../page-ambiente/page-ambiente.component';
import { SelectItem } from 'primeng/api';

export class Mesa {
    id: number = null;
    numeroMesa: number = 0;
    quantidadePessoas: number = 0;
    status: boolean = true;
    ativo: boolean = true;
}

@Component({
    selector: 'app-page-mesa',
    templateUrl: './page-mesa.component.html'
})

export class PageMesaComponent extends CrudComponent {

    mesa: Mesa = new Mesa();
    dadosStatus: any = [];



    //********************* init Methods ********************/
    private loadCampoOrdenacao() {
        this.campoSelecionadoOrdenacao = 'id';
        this.camposOrdenacao.push({ label: 'Código', value: 'id' });
        this.camposOrdenacao.push({ label: 'Numero da Mesa', value: 'numeroMesa' });
    }

    private loadListagemMesas() {
        this.cols = [{ field: 'id', header: 'Codigo', width: '80px' },
        { field: 'numeroMesaDesc', header: 'Numero da Mesa', width: '250px' },
        { field: 'quantidadePessoasDesc', header: 'Quantidade de Pessoas', width: '250px' }]
    }

    private loadStatusMesa() {
        this.dadosStatus = [];
        this.dadosStatus.push({ label: 'Ativo', value: true });
        this.dadosStatus.push({ label: 'Inativo', value: false });
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

    }

    acaoAlterar() {
        super.acaoAlterar();
        this.loadStatusMesa();

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



        this.objetoSelecionado = this.mesa;
        return true;
    }

}
