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

  formAddGroup!: FormGroup;
  
  registrationTypes!: any[];
  mcCodes!: any[];
  
  input_mcCode: any;
  input_registrationType: any;
  input_name: any;
  input_documentNumber: any;
  input_email: any;

  attributes!: IAttributes;

  knobQueue: number = 0;
  knobAnalisado: number = 0;
  knobTotal: number = 100;

  constructor(
    private mccCodeService: MCCodesService, 
    private preRegistrationsService: PreRegistrationsService, 
    private prospectsQueueService: ProspectsQueueService, 
    public dialogService: DialogService,
    private formBuilder: FormBuilder) {

    this.formAddGroup = new FormGroup({
      input_registrationType: new FormControl(null),
      input_mcCode: new FormControl(null),
      input_name: new FormControl(null),
      input_documentNumber: new FormControl(null),
      input_email: new FormControl(null)
    });

    this.queue = [
      "0", "2021", "2022", "..."
    ];
  }

  ngOnInit() {

    this.registrationTypes = [
      { label: 'Selecione o Tipo de Registro', value: null, document: 'Número do Documento', name: 'Nome', mask:"", email: 'E-mail' },
      { label: 'Pessoa Física', value: 'pessoa_fisica', document: 'CPF', name: 'Nome Completo', mask:"999.999.999-99", email: 'E-mail Pessoal' },
      { label: 'Pessoa Jurídica', value: 'pessoa_juridica', document: 'CNPJ', name: 'Razão Social', mask:"99.999.999/9999-99", email: 'E-mail Institucional' }
    ];
    this.input_registrationType = this.registrationTypes[0];


    this.mountTable();
    this.getMCCodeList();
    this.mountKnob()
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
    this.prospectsQueueService.list().subscribe((response) => {
      this.knobQueue = response.data.length;
    });
  }

  mountLine() {

  }

  mountTable() {
    this.preRegistrationsService.list().subscribe((response) => {
      console.log('mountTable():', response.status, response.message);
      this.preRegistrations = response.data;
      this.knobTotal = this.preRegistrations.length;
    });
  }

  showAddDialog() {
    this.addVisible = true;
  }

  saveAddDialog() {
    console.log('saveAddDialog():', this.formAddGroup.value);
  }

  onRegistrationTypeChange(event: any) {
    this.input_registrationType = this.registrationTypes.find(type => type.value == event.value.value);
    
    if (this.input_registrationType.value == 'pessoa_fisica') {
      this.attributes = this.pessoaFisica as IPessoaFisica; 

    } else if (this.input_registrationType.value == 'pessoa_juridica') {
      this.attributes = this.pessoaJuridica as IPessoaJuridica;
    } 

    const controls = Object.keys(this.attributes).reduce((acc: any, key: any) => {
      acc[key] = this.formBuilder.control('');
      return acc;
    }, {});
    Object.keys(controls).forEach(key => {
      this.formAddGroup.addControl(key, controls[key]);
    }); 
  }
}