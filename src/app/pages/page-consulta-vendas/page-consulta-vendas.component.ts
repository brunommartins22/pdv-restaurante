import { Component, Injector } from "@angular/core";
import { ProcessoComponent, StringUtils } from 'padrao';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: "app-page-consulta-vendas",
    templateUrl: "./page-consulta-vendas.component.html",
    styles: [`
        
        .divergent {
            background-color: #EE9EAF !important;
            color: black !important;
        }

        .corret {
            background-color: #CCF7D4 !important;
            color: black !important;
        }
    `
    ],
})

export class PageConsultaVendas extends ProcessoComponent {

    confirmationService: ConfirmationService;
    tituloConsultaVendas: any = "";
    loading: boolean = false;
    isActiveFieldset: boolean = false;
    pt: any = null;
    descricaoPromocao: any = null;



    rangeDates: Date[] = null;
    dadosFilialDropdown: any = [];
    dadosFiltro: any = [];


    filialDropdownSelecionada: any = null;



    //******************** methods ************************/

    private loadFilialDropdown() {

        this.dadosFilialDropdown = [];
        this.filialDropdownSelecionada = null;

        this.dadosFilialDropdown.push({ label: "Selecione...", value: null });

        //******** Popular um model dentro de um DropDown *********/
        this.httpUtilService.get("/filialscanntech/loadAllFilial").subscribe(data => {
            let dados = data.json();

            dados.forEach(o => {
                this.dadosFilialDropdown.push({ label: o.codigoFilial + " - " + o.nomeFilial, value: o });
            });

        }, erro => {
            this.toastError(erro.message);
        });


    }


    private loadDateByPt() {
        this.pt = {
            firstDayOfWeek: 0,
            dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
            dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
            dayNamesMin: ["Do", "Se", "Te", "Qa", "Qi", "Se", "Sa"],
            monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
            monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Aug", "Set", "Out", "Nov", "Dez"],
            today: 'Hoje',
            clear: 'Limpar',
            dateFormat: 'dd/MM/yyyy',
            weekHeader: 'Wk'
        };
    }


    //******************** end methods ********************/


    constructor(injector: Injector) {
        super(injector);
        this.confirmationService = injector.get(ConfirmationService);
    }

    ngOnInit() {
        this.tituloConsultaVendas = "Consulta de Vendas";
        this.urlControler = "/notasaiitens";
        this.loadFilialDropdown();
        this.loadDateByPt();
    }

    loadSearchFilters() {
        this.loading = true;
        this.isActiveFieldset = false;


        const map = {
            codigoFilial: this.filialDropdownSelecionada != null ? this.filialDropdownSelecionada.codigoFilial : null,
            descricaoPromocao: this.descricaoPromocao,
            datas: this.rangeDates == undefined || this.rangeDates == null ? [] : this.rangeDates
        }

        this.httpUtilService.post(this.urlControler + "/findItensByFilters", map).subscribe(data => {

            this.dadosFiltro = data.json();
          
            this.dadosFiltro.forEach(d => {
                d.dataVenda = StringUtils.string2Date(d.dataVenda);
            });

            this.isActiveFieldset = true;
            this.loading = false;
            this.toastSuccess("Pesquisa realizada com sucesso.");

        }, erro => {
            this.loading = false;
            this.dadosFiltro = null;
            this.toastError(erro.message);
        });
    }


    clearSearchFilters() {
        this.loading = true;
        this.isActiveFieldset = false;

        this.loadFilialDropdown();
        this.descricaoPromocao = null;
        this.rangeDates = null;

        this.dadosFiltro = null;
        this.loading = false;
    }


}