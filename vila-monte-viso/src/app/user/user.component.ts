import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { throwError as observableThrowError,  Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../common/_services/user.service';
import datatablesConfig from '../common/_configs/datatable-pt-br.config';

@Component({
  selector: 'app-user',
  templateUrl: './user.template.html',
  styleUrls: ['./user.style.css']
})
export class UserComponent implements OnInit {

  private users = [];
  public isLoading = true;

  private user = {};
  private isEditing = false;
  private dtOptions: DataTables.Settings = {};

  public addUserForm: FormGroup;
  private username = new FormControl('', Validators.required);
  private password = new FormControl('', Validators.required);

  private infoMsg = { body: '', type: 'info' };

  constructor(private http: HttpClient,
    private _userService: UserService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.dtOptions = datatablesConfig;
    this.getUsers();
    this.addUserForm = this.formBuilder.group({
      username: this.username,
      password: this.password,
    });

  }

  getUsers() {
    this._userService.getAll().subscribe(
      data => console.log(data),
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  enableView(user) {
    this.isEditing = true;
    this.user = user;
  }

  cancelView() {
    this.isEditing = false;
    this.user = {};
    this.sendInfoMsg('Visualização de Mensagem cancelada.', 'warning');
    this.getUsers();
  }

  deleteUser(user) {
    if (window.confirm('Tem certeza que quer deletar este mensagem?')) {
      this._userService.remove(user).subscribe(
        res => {
          const pos = this.users.map(item => item.id).indexOf(user.id);
          this.users.splice(pos, 1);
          this.sendInfoMsg('Mensagem deletada com sucesso.', 'success');
        },
        error => console.log(error),
        () => this.getUsers()
      );
    }
  }

  sendInfoMsg(body, type, time = 3000) {
    this.infoMsg.body = body;
    this.infoMsg.type = type;
    window.setTimeout(() => this.infoMsg.body = '', time);
  }

}
