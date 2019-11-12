import { CrudComponent } from 'padrao';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-page-departamento',
    templateUrl: './page-departamento.component.html',

})
export class PageDepartamentoComponent extends CrudComponent {
    listaSecao: any;

    ngOnInit() {

        this.campoSelecionadoOrdenacao = 'id';
        this.camposOrdenacao.push({ label: 'Código', value: 'id' });
        this.camposOrdenacao.push({ label: 'Departamento', value: 'nomeDepartamento' });
        this.camposOrdenacao.push({ label: 'Seção', value: 'secao.nmSecao' });

        document.body.classList.remove('body-img');

        super.iniciar('/departamentos');

        this.Secoes();

        this.cols = [
            { field: 'id', header: 'ID', width: '10px' },
            { field: 'nomeDepartamento', header: 'Departamento', width: '100px' },
            { field: 'nmSecao', header: 'Seção', width: '120px' }
        ];

    }

    Secoes() {
        this.httpUtilService.get('/secoes').subscribe(data => {
            console.log(' Seções ', data.json());
            this.listaSecao = [];
            this.listaSecao.push({ label: 'Selecione', value: 'null' });
            for (const s of data.json()) {
                this.listaSecao.push({ label: s.nmSecao, value: s });

            }
        });
    }

    validar() {
        if (this.objetoSelecionado.nomeDepartamento == null ||
            this.objetoSelecionado.nomeDepartamento === undefined ||
            this.objetoSelecionado.nomeDepartamento === '') {
            this.showError('Valor do Departamento não informado ou invalido!');
            this.setarFocus('nomeDepartamento');
            return false;
        }

        return true;
    }

}
