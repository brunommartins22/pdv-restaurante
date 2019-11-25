import { Component } from "@angular/core";
import { CrudComponent } from 'padrao';

@Component({
    selector: 'app-page-mesa',
    templateUrl: './page-mesa.component.html'
})

export class PageMesaComponent extends CrudComponent {

    //********************* init methods ********************/
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


    ngOnInit() {
        this.objetoSelecionado = new Object();
        this.loadCampoOrdenacao();
        this.loadListagemMesas();
        super.iniciar('/mesas')
    }

}