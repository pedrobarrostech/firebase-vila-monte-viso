import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { environment } from '../../environments/environment';
import { BannerService } from '../common/_services/banner.service';
import datatablesConfig from '../common/_configs/datatable-pt-br.config';
import * as firebase from 'firebase';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.template.html',
  styleUrls: ['./banner.style.css']
})
export class BannerComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;

  private banners: any;
  public isLoading = true;
  public assetsUrl = environment.ASSETS_URL;

  private banner = {};
  private isEditing = false;
  private dtOptions: DataTables.Settings = {};
  private bannerEditImage = {};

  public addBannerForm: FormGroup;
  private name = new FormControl('', Validators.required);
  private order = new FormControl('', Validators.required);
  private active = new FormControl('', Validators.required);

  private infoMsg = { body: '', type: 'info'};

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
    this._bannerService.add(this.addBannerForm.value).subscribe(
      res => {
        const newBanner = res;
        this.banners.push(newBanner);
        this.addBannerForm.reset();
        console.log(this.uploadFile(this.addBannerForm.value.image));
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
    this.sendInfoMsg('Edição de banner cancelada.', 'warning');
    this.getBanners();
  }

  editBanner(banner) {
    banner.image = this.bannerEditImage ? this.bannerEditImage : banner.image;
    this._bannerService.update(banner).subscribe(
      res => {
        this.isEditing = false;
        banner.image = `uploads/${banner.image.filename}`;
        this.banner = banner;
        this.sendInfoMsg('Banner editado com sucesso.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteBanner(banner) {
    if (window.confirm('Tem certeza que quer deletar este bannere?')) {
      this._bannerService.remove(banner).subscribe(
        res => {
          const pos = this.banners.map(item => item.id).indexOf(banner.id);
          this.banners.splice(pos, 1);
          this.sendInfoMsg('Banner deletado com sucesso.', 'success');
        },
        error => console.log(error),
        () => this.getBanners()
      );
    }
  }

  sendInfoMsg(body, type, time = 3000) {
    this.infoMsg.body = body;
    this.infoMsg.type = type;
    window.setTimeout(() => this.infoMsg.body = '', time);
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.addBannerForm.get('image').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        });

        this.bannerEditImage = {
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        };

        const ref = firebase.storage().ref();
        // Create a reference to 'mountains.jpg'
        const storageRef = ref.child(this.generateId() + file.name);
        storageRef.put(file).then(function(snapshot) {
            // console.log('Uploaded a blob or file!', snapshot);
            snapshot.ref.getDownloadURL().then(function(downloadURL) {
              console.log('File available at', downloadURL);
            });
            this.sendInfoMsg('Banner adicionado com sucesso.', 'success');
            this.getBanners();
        });
      };
    }
  }

  uploadFile(file) {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        const ref = firebase.storage().ref();
        // Create a reference to 'mountains.jpg'
        const storageRef = ref.child(this.generateId() + file.name);
        return storageRef.put(file).then(function(snapshot) {
            // console.log('Uploaded a blob or file!', snapshot);
            snapshot.ref.getDownloadURL().then(function(downloadURL) {
              return downloadURL;
            });
        });
      };
    }
  }

  generateId () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  clearFile() {
    this.addBannerForm.get('image').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

}
