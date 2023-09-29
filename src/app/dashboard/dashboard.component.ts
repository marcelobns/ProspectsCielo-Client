import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MCCodesService } from '../services/MCCodesService';
import { PreRegistrationsService } from '../services/PreRegistrationsService';
import { ProspectsQueueService } from '../services/ProspectsQueueService';
import { DialogService } from 'primeng/dynamicdialog'
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

import { IPreRegistration } from '../interfaces/IPreRegistration';
import { IPessoaFisica, PessoaFisica } from '../interfaces/IPessoaFisica';
import { IPessoaJuridica, PessoaJuridica } from '../interfaces/IPessoaJuridica';
import { IAttributes } from '../interfaces/IMetadata';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DialogService],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  pessoaFisica = PessoaFisica;
  pessoaJuridica = PessoaJuridica;

  queue: string[];
  preRegistrations!: IPreRegistration[];
  addVisible: boolean = false;

  formGroup!: FormGroup;
  
  registrationTypes!: any[];
  selectedRegistrationType: any;

  mcCodes!: any[];
  selectedMCCode: any;
  inputNome: any;
  inputDocumentNumber: any;
  attributes!: IAttributes;

  constructor(
    private mccCodeService: MCCodesService, 
    private preRegistrationsService: PreRegistrationsService, 
    private prospectsQueueService: ProspectsQueueService, 
    public dialogService: DialogService,
    private formBuilder: FormBuilder) {

    this.formGroup = new FormGroup({
      selectedRegistrationType: new FormControl(null),
      selectedMCCode: new FormControl(null),
      inputNome: new FormControl(null),
      inputDocumentNumber: new FormControl(null),
    });

    this.queue = [
      "0", "2021", "2022", "..."
    ];
  }

  ngOnInit() {

    this.registrationTypes = [
      { label: 'Selecione o Tipo de Registro', value: null, document: 'Número do Documento', name: 'Nome' },
      { label: 'Pessoa Física', value: 'pessoa_fisica', document: 'CPF', name: 'Nome Completo' },
      { label: 'Pessoa Jurídica', value: 'pessoa_juridica', document: 'CNPJ', name: 'Razão Social' }
    ];
    this.selectedRegistrationType = this.registrationTypes[0];


    this.mountTable();
    this.getMCCodeList();
    
  }

  getMCCodeList() {
    this.mccCodeService.list().subscribe((response) => {
      console.log('getMCCodeList():', response.status, response.message);
      this.mcCodes = response.data.map((item:any) => ({
        ...item,
        combined: `${item.code} - ${item.programType}`
      }));
    });
  }

  mountKnob() {

  }

  mountLine() {

  }

  mountTable() {
    this.preRegistrationsService.list().subscribe((response) => {
      console.log('mountTable():', response.status, response.message);
      this.preRegistrations = response.data;
    });
  }

  showAddDialog() {
    this.addVisible = true;
  }

  onRegistrationTypeChange(event: any) {
    this.selectedRegistrationType = this.registrationTypes.find(type => type.value == event.value.value);
    
    if(this.selectedRegistrationType.value == 'pessoa_fisica') {
      this.attributes = this.pessoaFisica as IPessoaFisica; 

    } else if (this.selectedRegistrationType.value == 'pessoa_juridica') {
      this.attributes = this.pessoaJuridica as IPessoaJuridica;
    } 

    const controls = Object.keys(this.attributes).reduce((acc: any, key: any) => {
      acc[key] = this.formBuilder.control('');
      return acc;
    }, {});
    Object.keys(controls).forEach(key => {
      this.formGroup.addControl(key, controls[key]);
    });
    
  }

}