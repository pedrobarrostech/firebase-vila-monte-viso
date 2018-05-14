import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { MessageService } from '../common/_services/message.service';
import datatablesConfig from '../common/_configs/datatable-pt-br.config';

@Component({
  selector: 'app-message',
  templateUrl: './message.template.html',
  styleUrls: ['./message.style.css']
})
export class MessageComponent implements OnInit {

  private messages = [];
  public isLoading = true;

  private message = {};
  private isEditing = false;
  private dtOptions: DataTables.Settings = {};

  public addMessageForm: FormGroup;
  private title = new FormControl("", Validators.required);
  private subject = new FormControl("", Validators.required);
  private phone = new FormControl("", Validators.required);
  private email = new FormControl("", Validators.required);
  
  private infoMsg = { body: "", type: "info"};

  constructor(private http: Http,
              private _messageService: MessageService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.dtOptions = datatablesConfig;
    this.getMessages();
    this.addMessageForm = this.formBuilder.group({
      title: this.title,
      subject: this.subject,
      phone: this.phone,
      email: this.email
    });

  }

  getMessages() {
    this._messageService.getAll().subscribe(
      data => this.messages = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  enableView(message) {
    this.isEditing = true;
    this.message = message;
  }

  cancelView() {
    this.isEditing = false;
    this.message = {};
    this.sendInfoMsg("Visualização de Mensagem cancelada.", "warning");
    this.getMessages();
  }

  deleteMessage(message) {
    if(window.confirm("Tem certeza que quer deletar este mensagem?")) {
      this._messageService.remove(message).subscribe(
        res => {
          var pos = this.messages.map(message => { return message.id }).indexOf(message.id);
          this.messages.splice(pos, 1);
          this.sendInfoMsg("Mensagem deletada com sucesso.", "success");
        },
        error => console.log(error),
        () => this.getMessages()
      );
    }
  }

  sendInfoMsg(body, type, time = 3000) {
    this.infoMsg.body = body;
    this.infoMsg.type = type;
    window.setTimeout(() => this.infoMsg.body = "", time);
  }

}
