import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MCCodesService } from '../services/MCCodesService';
import { PreRegistrationsService } from '../services/PreRegistrationsService';
import { ProspectsQueueService } from '../services/ProspectsQueueService';
import { IPreRegistration } from '../interfaces/IPreRegistration';
import { DialogService } from 'primeng/dynamicdialog'
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DialogService],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  
  queue: string[];
  preRegistrations!: IPreRegistration[];
  addVisible: boolean = false;


  formGroup!: FormGroup;
  registrationTypes!: any[];
  selectedRegistrationType: any;

  constructor(
    private mccCodeService: MCCodesService, 
    private preRegistrationsService: PreRegistrationsService, 
    private prospectsQueueService: ProspectsQueueService, 
    public dialogService: DialogService) {
    this.queue = [
      "0", "2021", "2022", "..."
    ];

    this.mountTable();
  }

  ngOnInit() {
    // this.formGroup = new FormGroup({
    //   selectedCity: new FormControl<any | null>(null)
    // });
    
  }

  mountKnob() {

  }

  mountLine() {

  }

  mountTable() {
    this.preRegistrationsService.list().subscribe((response) => {
      console.log(response);
      this.preRegistrations = response.data;
    });
  }

  showAddDialog() {
    this.addVisible = true;
    this.registrationTypes = [
      {label: 'Selecione', value: null},
      {label: 'Pessoa Física', value: 'pessoa_fisica'},
      {label: 'Pessoa Jurídica', value: 'pessoa_juridica'}
    ];

    this.formGroup = new FormGroup({
      selectedCity: new FormControl<any | null>(null)
    });

  }
}
