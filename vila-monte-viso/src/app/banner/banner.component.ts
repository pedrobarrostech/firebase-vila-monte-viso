import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { environment } from '../../environments/environment';
import { BannerService } from '../common/_services/banner.service';
import datatablesConfig from '../common/_configs/datatable-pt-br.config';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.template.html',
  styleUrls: ['./banner.style.css']
})
export class BannerComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;

  private banners = [];
  public isLoading = true;
  public assetsUrl = environment.ASSETS_URL;

  private banner = {};
  private isEditing = false;
  private dtOptions: DataTables.Settings = {};
  private bannerEditImage = {};

  public addBannerForm: FormGroup;
  private name = new FormControl("", Validators.required);
  private order = new FormControl("", Validators.required);
  private active = new FormControl("", Validators.required);
  
  private infoMsg = { body: "", type: "info"};

  constructor(private http: Http,
              private _bannerService: BannerService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getBanners();
    this.dtOptions = datatablesConfig;

    this.addBannerForm = this.formBuilder.group({
      name: this.name,
      order: this.order,
      image: null,
      active: this.active
    });

  }

  getBanners() {
    this._bannerService.getAll().subscribe(
      data => this.banners = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addBanner() {
    console.log(this.addBannerForm.value)
    this._bannerService.add(this.addBannerForm.value).subscribe(
      res => {
        var newBanner = res;
        this.banners.push(newBanner);
        this.addBannerForm.reset();
        this.sendInfoMsg("Banner adicionado com sucesso.", "success");
        this.getBanners();
      },
      error => console.log(error),
      () => this.getBanners()
    );
  }

  enableEditing(banner) {
    this.isEditing = true;
    this.banner = banner;
  }

  cancelEditing() {
    this.isEditing = false;
    this.banner = {};
    this.sendInfoMsg("Edição de banner cancelada.", "warning");
    this.getBanners();
  }

  editBanner(banner) {
    banner.image = this.bannerEditImage ? this.bannerEditImage : banner.image;
    this._bannerService.update(banner).subscribe(
      res => {
        this.isEditing = false;
        banner.image = `uploads/${banner.image.filename}`
        this.banner = banner;
        this.sendInfoMsg("Banner editado com sucesso.", "success");
      },
      error => console.log(error)
    );
  }

  deleteBanner(banner) {
    if(window.confirm("Tem certeza que quer deletar este bannere?")) {
      this._bannerService.remove(banner).subscribe(
        res => {
          var pos = this.banners.map(banner => { return banner.id }).indexOf(banner.id);
          this.banners.splice(pos, 1);
          this.sendInfoMsg("Banner deletado com sucesso.", "success");
        },
        error => console.log(error),
        () => this.getBanners()
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
        this.addBannerForm.get('image').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })
        
        this.bannerEditImage = {
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        }
      };
    }
  }

  clearFile() {
    this.addBannerForm.get('image').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

}
