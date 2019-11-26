import { CrudComponent } from 'padrao';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-cliente',
  templateUrl: './page-cliente.component.html',

})
export class PageClienteComponent extends CrudComponent {

listaPessoas = [];

// ************************* init Method Address ****************************

private loadPessoas() {
    this.listaPessoas = new Array ();
    this.listaPessoas.push({label: 'Pessoa Física', value: 'FISICA'});
    this.listaPessoas.push({label: 'Pessoa jurídica', value: 'JURIDICA'});

}

instance() {
    this.objetoSelecionado = new Object();
    this.objetoSelecionado.pessoa = new Object();
    this.objetoSelecionado.pessoa.tipoPessoa = 'JURIDICA';

}

  ngOnInit() {

    super.iniciar ('/cliente');

    this.loadPessoas();
  }

}
