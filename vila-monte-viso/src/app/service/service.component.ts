import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { ServiceService } from '../common/_services/service.service';
import datatablesConfig from '../common/_configs/datatable-pt-br.config';

@Component({
  selector: 'app-service',
  templateUrl: './service.template.html',
  styleUrls: ['./service.style.css']
})
export class ServiceComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;

  private services = [];
  public isLoading = true;

  private service = {};
  private isEditing = false;
  private dtOptions: DataTables.Settings = {};
  private serviceEditImage = {};

  public addServiceForm: FormGroup;
  private name = new FormControl("", Validators.required);
  private description = new FormControl("", Validators.required);
  private link = new FormControl("", Validators.required);
  private active = new FormControl("", Validators.required);
  
  private infoMsg = { body: "", type: "info"};

  constructor(private http: Http,
              private _serviceService: ServiceService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getServices();
    this.dtOptions = datatablesConfig;

    this.addServiceForm = this.formBuilder.group({
      name: this.name,
      description: this.description,
      link: this.link,
      active: this.active
    });

  }

  getServices() {
    this._serviceService.getAll().subscribe(
      data => this.services = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addService() {
    this._serviceService.add(this.addServiceForm.value).subscribe(
      res => {
        var newService = res;
        this.services.push(newService);
        this.addServiceForm.reset();
        this.sendInfoMsg("Serviço adicionado com sucesso.", "success");
      },
      error => console.log(error),
      () => this.getServices()
    );
  }

  enableEditing(service) {
    this.isEditing = true;
    this.service = service;
  }

  cancelEditing() {
    this.isEditing = false;
    this.service = {};
    this.sendInfoMsg("Edição de serviço cancelada.", "warning");
    this.getServices();
  }

  editService(service) {
  
    service.image = this.serviceEditImage ? this.serviceEditImage : service.image;
    this._serviceService.update(service).subscribe(
      res => {
        this.isEditing = false;
        service.image = `uploads/${service.image.filename}`;
        this.service = service;
        this.sendInfoMsg("Serviço editado com sucesso.", "success");
      },
      error => console.log(error)
    );
  }

  deleteService(service) {
    if(window.confirm("Tem certeza que quer deletar este servicee?")) {
      this._serviceService.remove(service).subscribe(
        res => {
          var pos = this.services.map(service => { return service.id }).indexOf(service.id);
          this.services.splice(pos, 1);
          this.sendInfoMsg("Serviço deletado com sucesso.", "success");
        },
        error => console.log(error),
        () => this.getServices()
      );
    }
  }

  sendInfoMsg(body, type, time = 3000) {
    this.infoMsg.body = body;
    this.infoMsg.type = type;
    window.setTimeout(() => this.infoMsg.body = "", time);
  }

}
