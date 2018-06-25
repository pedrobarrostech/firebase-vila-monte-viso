import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { environment } from '../../environments/environment';
import { SectionService } from '../common/_services/section.service';
import { UploadService } from '../common/_services/upload.service';
import datatablesConfig from '../common/_configs/datatable-pt-br.config';
import * as firebase from 'firebase';
@Component({
  selector: 'app-section',
  templateUrl: './section.template.html',
  styleUrls: ['./section.style.css']
})
export class SectionComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;

  private sections: any;
  public isLoading = true;
  public assetsUrl = environment.ASSETS_URL;

  private section = {};
  private isEditing = false;
  private dtOptions: DataTables.Settings = {};

  public addSectionForm: FormGroup;
  private name = new FormControl('', Validators.required);
  private description = new FormControl('', Validators.required);
  private info = new FormControl('', Validators.required);
  private infoMsg = { body: '', type: 'info'};

  constructor(
              private _sectionService: SectionService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getSections();
    this.dtOptions = datatablesConfig;

    this.addSectionForm = this.formBuilder.group({
      name: this.name,
      description: this.description,
      image: null,
      imageRef: null,
      info: this.info
    });

  }

  getSections() {
    this._sectionService.getAll().subscribe(
      data => this.sections = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addSection() {
    this._sectionService.add(this.addSectionForm.value).subscribe(
      res => {
        const newSection = res;
        this.sections.push(newSection);
        this.addSectionForm.reset();
        this.sendInfoMsg('Sessão adicionado com sucesso.', 'success');
      },
      error => console.log(error),
      () => this.getSections()
    );
  }

  enableEditing(section) {
    this.isEditing = true;
    this.section = section;
  }

  cancelEditing() {
    this.isEditing = false;
    this.section = {};
    this.sendInfoMsg('Edição de sessão cancelada.', 'warning');
    this.getSections();
  }

  editSection(section) {
    this._sectionService.update(section).subscribe(
      res => {
        this.isEditing = false;
        section.image = `uploads/${section.image.filename}`;
        this.section = section;
        this.sendInfoMsg('Sessão editado com sucesso.', 'success');
      },
      error => console.log(error)
    );
  }

  async deleteSection(section) {
    if (window.confirm('Tem certeza que quer deletar esta sessão?')) {
      const ref = firebase.storage().ref();
      const storageRef = ref.child(section.imageRef);
      await storageRef.delete();
      this._sectionService.remove(section).subscribe(
        res => {
          const pos = this.sections.map(sectionItem => sectionItem.id).indexOf(section.id);
          this.sections.splice(pos, 1);
          this.sendInfoMsg('Sessão deletado com sucesso.', 'success');
        },
        error => console.log(error),
        () => this.getSections()
      );
    }
  }

  sendInfoMsg(body, type, time = 3000) {
    this.infoMsg.body = body;
    this.infoMsg.type = type;
    window.setTimeout(() => this.infoMsg.body = '', time);
  }

  async onFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {

        const filename = UploadService.generateId() + file.name;
        const ref = firebase.storage().ref();
        const storageRef = ref.child(filename);
        storageRef.put(file).then((snapshot) => {
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.addSectionForm.get('image').setValue(downloadURL);
            this.addSectionForm.get('imageRef').setValue(filename);
            console.log(this.addSectionForm);
          });
        });
      };
    }
  }

}
