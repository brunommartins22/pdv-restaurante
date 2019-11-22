import { Component, Injector } from "@angular/core";
import { ProcessoRestauranteComponent } from 'padrao';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: "app-page-pedidos",
    templateUrl: "./page-pedidos.component.html",
    styles: [`
        .livre {
            background-color: #5CB85C !important;
            color: black !important;
            text-align: center !important;
            border: transparent;cursor: pointer;
            border-radius: 10px !important;
            font-size:14px !important;
            font-weight:bold;
            box-shadow: 5px 5px 5px rgba(50, 50, 50, 0.2);
        }
        .inativo {
            background-color: #D9534F !important;
            color: black !important;
            text-align: center !important;
            border: transparent;cursor: pointer;
            border-radius: 10px !important;
            font-size:14px !important;
            font-weight:bold;
            box-shadow: 5px 5px 5px rgba(50, 50, 50, 0.2);
        }

        .reservado {
            background-color: #F0AD4E !important;
            color: black !important;
            text-align: center !important;
            border: transparent;cursor: pointer;
            border-radius: 10px !important;
            font-size:14px !important;
            font-weight:bold;
            box-shadow: 5px 5px 5px rgba(50, 50, 50, 0.2);
        }
        .ocupado{
            background-color: #1C7CD5 !important;
            color: black !important;
            text-align: center !important;
            border: transparent;cursor: pointer;
            border-radius: 10px !important;
            font-size:14px !important;
            font-weight:bold;
            box-shadow: 5px 5px 5px rgba(50, 50, 50, 0.2);
        }
    `
    ],
})

export class PagePedidosComponent extends ProcessoRestauranteComponent {

    confirmationService: ConfirmationService;
    tituloPedidos: any = "";
    renderizarPedidos: boolean = false;


    dadosPedidos: any = [];

    pedidoSelecionado: any = null;

    constructor(injector: Injector) {
        super(injector);
        this.confirmationService = injector.get(ConfirmationService);
    }

    private carregarList() {
        this.dadosPedidos = [];
        for (let i = 1; i <= 50; i++) {
            this.dadosPedidos.push({ id: i, status: i == 10 ? 'ocupado' : i == 25 ? 'ocupado' : i == 26 ? 'inativo' : i == 35 ? 'reservado' : 'livre' });
        }
    }


    ngOnInit() {
        this.tituloPedidos = "PDV - Restaurante";
        this.urlControler = "/pedidos";
        // document.body.classList.remove("body-img")
        this.carregarList();

    }

    editarPedido() {
        this.renderizarPedidos = true;
    }


}
