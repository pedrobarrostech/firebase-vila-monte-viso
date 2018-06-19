import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { environment } from '../../environments/environment';
import { BannerService } from '../common/_services/banner.service';
import { UploadService } from '../common/_services/upload.service';
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
      imageRef: null,
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

  async addBanner() {
    this._bannerService.add(this.addBannerForm.value).subscribe(
      res => {
        const newBanner = res;
        this.banners.push(newBanner);
        this.addBannerForm.reset();
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
    this._bannerService.update(banner).subscribe(
      res => {
        this.isEditing = false;
        this.banner = banner;
        this.sendInfoMsg('Banner editado com sucesso.', 'success');
      },
      error => console.log(error)
    );
  }

  async deleteBanner(banner) {
    if (window.confirm('Tem certeza que quer deletar este banner?')) {
      const ref = firebase.storage().ref();
      const storageRef = ref.child(banner.imageRef);
      await storageRef.delete();

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
    if (event.target.files && event.target.files.length > 0) {
      const imageInfo: any = UploadService.uploadFile(event.target.files[0]);

      this.addBannerForm.get('image').setValue(imageInfo.image);
      this.addBannerForm.get('imageRef').setValue(imageInfo.imageRef);


      // const reader = new FileReader();
      // const file = event.target.files[0];
      // reader.readAsDataURL(file);
      // reader.onload = () => {

      //   const filename = this.generateId() + file.name;
      //   const ref = firebase.storage().ref();
      //   const storageRef = ref.child(filename);
      //   storageRef.put(file).then((snapshot) => {
      //     snapshot.ref.getDownloadURL().then((downloadURL) => {

      //     });
      //   });
      // };
    }
  }

  uploadFile(file) {

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const filename = this.generateId() + file.name;
        const ref = firebase.storage().ref();
        const storageRef = ref.child(filename);
        storageRef.put(file).then((snapshot) => {
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.addBannerForm.get('image').setValue(downloadURL);
            this.addBannerForm.get('imageRef').setValue(filename);
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
