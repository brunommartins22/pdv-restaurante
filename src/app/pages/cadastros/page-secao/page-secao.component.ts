import { CrudComponent } from 'padrao';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-page-secao',
    templateUrl: './page-secao.component.html',

})
export class PageSecaoComponent extends CrudComponent {

    listaSecao: any;

    ngOnInit() {

        this.campoSelecionadoOrdenacao = 'id';
        this.camposOrdenacao.push({ label: 'Código', value: 'id' });
        this.camposOrdenacao.push({ label: 'Secão', value: 'nmSecao' });

        this.cols = [
            { field: 'id', header: 'ID', width: '10px' },
            { field: 'nmSecao', header: 'secao', width: '300px' },

        ];


        // document.body.classList.remove('body-img');

        super.iniciar('/secoes');

        this.carregarSecao();

    }

    carregarSecao() {
        this.httpUtilService.get('/secoes').subscribe(data => {
            this.listaSecao = [];
            this.listaSecao.push({ nmSecao: 'Selecione', value: 'null' });
            for (const s of data.json()) {
                this.listaSecao.push(s);
            }
        });
    }

    validar() {
        if (this.objetoSelecionado.nmSecao == null ||
            this.objetoSelecionado.nmSecao === undefined ||
            this.objetoSelecionado.nmSecao === '') {
            this.showError('Valor da secao não informado ou invalido!');
            this.setarFocus('nmSecao');
            return false;
        }

        return true;
    }

}
