import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MCCodesService } from '../services/MCCodesService';
import { PreRegistrationsService } from '../services/PreRegistrationsService';
import { ProspectsQueueService } from '../services/ProspectsQueueService';
import { DialogService } from 'primeng/dynamicdialog'
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { IPreRegistration } from '../interfaces/IPreRegistration';
import { IPessoaFisica, PessoaFisica } from '../interfaces/IPessoaFisica';
import { IPessoaJuridica, PessoaJuridica } from '../interfaces/IPessoaJuridica';
import { IAttributes } from '../interfaces/IMetadata';
import { IProspectsQueue } from '../interfaces/IProspectsQueue';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DialogService, MessageService],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  preRegistrationId!: number;
  pessoaFisica = PessoaFisica;
  pessoaJuridica = PessoaJuridica;

  queue: string[];
  preRegistrations!: IPreRegistration[];
  registerFormVisible: boolean = false;

  formRegisterGroup!: FormGroup;
  
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

  titleRegisterDialog: string = 'Cadastrar Prospecto';
  showBtnAdd: boolean = false;
  showBtnEdit: boolean = false;

  constructor(
    private mccCodeService: MCCodesService, 
    private preRegistrationsService: PreRegistrationsService, 
    private prospectsQueueService: ProspectsQueueService, 
    public dialogService: DialogService,
    private formBuilder: FormBuilder,
    private messageService: MessageService) {

    this.formRegisterGroup = new FormGroup({
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
    
    this.mountTable();
    this.mountKnob()
    this.getMCCodeList();
    this.resetForm();
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

  openAddDialog() {
    this.titleRegisterDialog = 'Cadastrar Prospecto';
    this.showBtnAdd = true;
    this.formRegisterGroup.reset();
    this.registerFormVisible = true;  
  }

  openEditDialog(preRegistrationId: number) {
    this.titleRegisterDialog = 'Editar Prospecto';
    this.showBtnEdit = true;

    this.preRegistrationsService.show(preRegistrationId).subscribe((response) => {
      console.log('openEditDialog():', response);
      
      this.preRegistrationId = response.data.id;
      const attributes = JSON.parse(response.data.attributes);

      this.setAttributeToForm(response.data.registrationType);

      setTimeout(() => {
        console.log('this.attributes:', this.attributes);
        console.log('attributes:', attributes);
        Object.keys(attributes).forEach(key => {
          this.formRegisterGroup.patchValue({
            [`attr_${key}`]: attributes[key]
          });
        });

        this.formRegisterGroup.patchValue({
          input_registrationType: this.registrationTypes.find(type => type.value == response.data.registrationType),
          input_mcCode: this.mcCodes.find(mcCode => mcCode.id == response.data.mcCodeId),
          input_name: response.data.name,
          input_documentNumber: response.data.documentNumber,
          input_email: response.data.email
        });

        this.registerFormVisible = true;
      }, 1);
    });
  }

  saveAddDialog() {
    const preRegistration: IPreRegistration = this.beforeSave();

    this.preRegistrationsService.add(preRegistration).subscribe({
      next: (response) => {
        console.log('this.preRegistrationsService.add: ', response);
        if(response.status == 'Success'){
          this.messageService.add({ severity: 'success', summary: 'Pre Registration', detail: response.message });

          this.addProspectQueue(response.data.id);
          
          this.registerFormVisible = false;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: response.message });
        }
      },
      error: (error) => {
        this.messageService.add({severity:'error', summary:'Call Api Error', detail:error.message});
      }
    });
  }

  saveEditDialog(preRegistrationId : number) { 
    const preRegistration: IPreRegistration = this.beforeSave();

    this.preRegistrationsService.edit(preRegistrationId, preRegistration).subscribe({
      next: (response) => {
        console.log('this.preRegistrationsService.add: ', response);
        if (response.status == 'Success') {

          this.messageService.add({ severity: 'success', summary: 'Pre Registration', detail: response.message });
          this.prospectsQueueService.remove(preRegistrationId).subscribe({
            next: (response) => {
              this.addProspectQueue(preRegistrationId);
              this.registerFormVisible = false;
              this.formRegisterGroup.reset();
            }
          })
          
        } else {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: response.message });
        }
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Call Api Error', detail: error.message });
      }
    });
  }

  onRegistrationTypeChange(event: any) {
    this.setAttributeToForm(event.value.value);
  }

  addProspectQueue(preRegistrationId: number) {
    const prospectQueue: IProspectsQueue = {
      preRegistrationId: preRegistrationId
    }
    this.prospectsQueueService.add(prospectQueue).subscribe({
      next: (response) => {
        console.log('response:', response);
        if (response.status == 'Success') {
          this.messageService.add({ severity: 'success', summary: 'Prospect Queue', detail: response.message });
          this.mountTable();
          this.mountKnob();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: response.message });
        }
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Call Api Error', detail: error.message });
      }
    });
  }

  setAttributeToForm(registrationType: String) {
    this.formBuilder = new FormBuilder();
    this.input_registrationType = this.registrationTypes.find(type => type.value == registrationType);

    if (registrationType == 'pessoa_fisica') {
      this.attributes = this.pessoaFisica as IPessoaFisica;

    } else if (registrationType == 'pessoa_juridica') {
      this.attributes = this.pessoaJuridica as IPessoaJuridica;
    }

    const controls = Object.keys(this.attributes).reduce((acc: any, key: any) => {
      acc[key] = this.formBuilder.control(null);
      return acc;
    }, {});
    Object.keys(controls).forEach(key => {
      this.formRegisterGroup.addControl(key, controls[key]);
    });
  }

  beforeSave(){
    let attrRegistration: IAttributes = {};

    Object.keys(this.attributes).forEach(key => {
      attrRegistration[key.replace('attr_', '')] = this.formRegisterGroup.value[key];
    });

    const preRegistration: IPreRegistration = {
      mcCodeId: this.formRegisterGroup.value.input_mcCode.id,
      registrationType: this.formRegisterGroup.value.input_registrationType.value,
      name: this.formRegisterGroup.value.input_name,
      documentNumber: this.formRegisterGroup.value.input_documentNumber,
      email: this.formRegisterGroup.value.input_email,
      attributes: ''
    }

    if(preRegistration.registrationType == 'pessoa_fisica'){
      preRegistration.attributes = JSON.stringify({
        dataNascimento: this.formRegisterGroup.value['attr_dataNascimento'],
      });
    } else if(preRegistration.registrationType == 'pessoa_juridica'){
      preRegistration.attributes = JSON.stringify({
        contatoNome: this.formRegisterGroup.value['attr_contatoNome'],
        contatoCpf: this.formRegisterGroup.value['attr_contatoCpf'],
        contatoEmail: this.formRegisterGroup.value['attr_contatoEmail']
      });
    }

    return preRegistration;
  }

  extractDetail(e:String){

  }
  onDialogHide(){
    this.resetForm();
  }

  resetForm(){
    this.showBtnAdd = false;
    this.showBtnEdit = false;
    this.registrationTypes = [
      { label: 'Selecione o Tipo de Registro', value: null, document: 'Número do Documento', name: 'Nome', mask: "", email: 'E-mail' },
      { label: 'Pessoa Física', value: 'pessoa_fisica', document: 'CPF', name: 'Nome Completo', mask: "999.999.999-99", email: 'E-mail Pessoal' },
      { label: 'Pessoa Jurídica', value: 'pessoa_juridica', document: 'CNPJ', name: 'Razão Social', mask: "99.999.999/9999-99", email: 'E-mail Institucional' }
    ];
    this.input_registrationType = this.registrationTypes[0];
    this.attributes = {};
    this.formRegisterGroup.reset();
  }
}