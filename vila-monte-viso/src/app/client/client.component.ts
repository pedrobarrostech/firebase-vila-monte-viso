import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ClientService } from '../common/_services/client.service';
import datatablesConfig from '../common/_configs/datatable-pt-br.config';

@Component({
  selector: 'app-client',
  templateUrl: './client.template.html',
  styleUrls: ['./client.style.css']
})
export class ClientComponent implements OnInit {

  private clients: any;
  public isLoading = true;

  private client = {};
  private isEditing = false;
  private dtOptions: DataTables.Settings = {};

  public addClientForm: FormGroup;
  private name = new FormControl('');
  private lastName = new FormControl('');
  private rg = new FormControl('');
  private cpf = new FormControl('');
  private maritalStatus = new FormControl('');
  private sex = new FormControl('');
  public address = new FormControl('');
  private city = new FormControl('');
  private state = new FormControl('');
  private phone = new FormControl('');
  private facebook = new FormControl('');
  private email = new FormControl('');
  private birthday = new FormControl('');
  private info = new FormControl('');

  private infoMsg = { body: '', type: 'info'};

  constructor(
              private _clientService: ClientService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getClients();
    this.dtOptions = datatablesConfig;

    this.addClientForm = this.formBuilder.group({
      name: this.name,
      lastName: this.lastName,
      rg: this.rg,
      cpf: this.cpf,
      maritalStatus: this.maritalStatus,
      sex: this.sex,
      address: this.address,
      city: this.city,
      state: this.state,
      phone: this.phone,
      facebook: this.facebook,
      email: this.email,
      birthday: this.birthday,
      info: this.info
    });

  }

  getClients() {
    this._clientService.getAll().subscribe(
      data => this.clients = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addClient() {
    this._clientService.add(this.addClientForm.value).subscribe(
      res => {
        const newClient = res;
        this.clients.push(newClient);
        this.addClientForm.reset();
        this.sendInfoMsg('Cliente adicionado com sucesso.', 'success');
      },
      error => console.log(error),
      () => this.getClients()
    );
  }

  enableEditing(client) {
    this.isEditing = true;
    this.client = client;
  }

  cancelEditing() {
    this.isEditing = false;
    this.client = {};
    this.sendInfoMsg('Edição de cliente cancelada.', 'warning');
    this.getClients();
  }

  editClient(client) {
    this._clientService.update(client).subscribe(
      res => {
        this.isEditing = false;
        this.client = client;
        this.sendInfoMsg('Cliente editado com sucesso.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteClient(client) {
    if (window.confirm('Tem certeza que quer deletar este cliente?')) {
      this._clientService.remove(client).subscribe(
        res => {
          const pos = this.clients.map(clientItem => clientItem.id).indexOf(client.id);
          this.clients.splice(pos, 1);
          this.sendInfoMsg('Cliente deletado com sucesso.', 'success');
        },
        error => console.log(error),
        () => this.getClients()
      );
    }
  }

  sendInfoMsg(body, type, time = 3000) {
    this.infoMsg.body = body;
    this.infoMsg.type = type;
    window.setTimeout(() => this.infoMsg.body = '', time);
  }

}
