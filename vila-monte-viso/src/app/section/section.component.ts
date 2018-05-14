import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { environment } from '../../environments/environment';
import { SectionService } from '../common/_services/section.service';
import datatablesConfig from '../common/_configs/datatable-pt-br.config';

@Component({
  selector: 'app-section',
  templateUrl: './section.template.html',
  styleUrls: ['./section.style.css']
})
export class SectionComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;

  private sections = [];
  public isLoading = true;
  public assetsUrl = environment.ASSETS_URL;

  private section = {};
  private isEditing = false;
  private dtOptions: DataTables.Settings = {};
  private sectionEditImage = {};

  public addSectionForm: FormGroup;
  private name = new FormControl("", Validators.required);
  private description = new FormControl("", Validators.required);
  private info = new FormControl("", Validators.required);
  
  private infoMsg = { body: "", type: "info"};

  constructor(private http: Http,
              private _sectionService: SectionService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getSections();
    this.dtOptions = datatablesConfig;

    this.addSectionForm = this.formBuilder.group({
      name: this.name,
      description: this.description,
      image: null,
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
        var newSection = res;
        this.sections.push(newSection);
        this.addSectionForm.reset();
        this.sendInfoMsg("Sessão adicionado com sucesso.", "success");
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
    this.sendInfoMsg("Edição de sessão cancelada.", "warning");
    this.getSections();
  }

  editSection(section) {
    section.image = this.sectionEditImage ? this.sectionEditImage : section.image;
    this._sectionService.update(section).subscribe(
      res => {
        this.isEditing = false;
        section.image = `uploads/${section.image.filename}`;
        this.section = section;
        this.sendInfoMsg("Sessão editado com sucesso.", "success");
      },
      error => console.log(error)
    );
  }

  deleteSection(section) {
    if(window.confirm("Tem certeza que quer deletar este sectione?")) {
      this._sectionService.remove(section).subscribe(
        res => {
          var pos = this.sections.map(section => { return section.id }).indexOf(section.id);
          this.sections.splice(pos, 1);
          this.sendInfoMsg("Sessão deletado com sucesso.", "success");
        },
        error => console.log(error),
        () => this.getSections()
      );
    }
  }

  sendInfoMsg(body, type, time = 3000) {
    this.infoMsg.body = body;
    this.infoMsg.type = type;
    window.setTimeout(() => this.infoMsg.body = "", time);
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.addSectionForm.get('image').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })
        
        this.sectionEditImage = {
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        }
      };
    }
  }

  clearFile() {
    this.addSectionForm.get('image').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

}
