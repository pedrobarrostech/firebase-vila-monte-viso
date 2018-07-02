import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { environment } from '../../environments/environment';
import { ProductService } from '../common/_services/product.service';
import datatablesConfig from '../common/_configs/datatable-pt-br.config';
import { UploadService } from '../common/_services/upload.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-product',
  templateUrl: './product.template.html',
  styleUrls: ['./product.style.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;

  private products: any;
  public isLoading = true;
  public assetsUrl = environment.ASSETS_URL;

  private product = {};
  private isEditing = false;
  private dtOptions: DataTables.Settings = {};
  private productEditImage = {};

  public addProductForm: FormGroup;
  private name = new FormControl('', Validators.required);
  private description = new FormControl('', Validators.required);
  private link = new FormControl('', Validators.required);
  private active = new FormControl('', Validators.required);

  private infoMsg = { body: '', type: 'info'};

  constructor(
              private _productService: ProductService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getProducts();
    this.dtOptions = datatablesConfig;

    this.addProductForm = this.formBuilder.group({
      name: this.name,
      description: this.description,
      image: null,
      imageRef: null,
      link: this.link,
      active: this.active
    });

  }

  getProducts() {
    this._productService.getAll().subscribe(
      data => this.products = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addProduct() {
    this._productService.add(this.addProductForm.value).subscribe(
      res => {
        const newProduct = res;
        this.products.push(newProduct);
        this.addProductForm.reset();
        this.sendInfoMsg('Produto adicionado com sucesso.', 'success');
      },
      error => console.log(error),
      () => this.getProducts()
    );
  }

  enableEditing(product) {
    this.isEditing = true;
    this.product = product;
  }

  cancelEditing() {
    this.isEditing = false;
    this.product = {};
    this.sendInfoMsg('Edição de produto cancelada.', 'warning');
    this.getProducts();
  }

  editProduct(product) {
    product.image = this.productEditImage ? this.productEditImage : product.image;
    this._productService.update(product).subscribe(
      res => {
        this.isEditing = false;
        product.image = `uploads/${product.image.filename}`;
        this.product = product;
        this.sendInfoMsg('Produto editado com sucesso.', 'success');
      },
      error => console.log(error)
    );
  }

  async deleteProduct(product) {
    if (window.confirm('Tem certeza que quer deletar este producte?')) {

      const ref = firebase.storage().ref();
      const storageRef = ref.child(product.imageRef);
      await storageRef.delete();

      this._productService.remove(product).subscribe(
        res => {
          const pos = this.products.map(productItem => productItem.id).indexOf(product.id);
          this.products.splice(pos, 1);
          this.sendInfoMsg('Produto deletado com sucesso.', 'success');
        },
        error => console.log(error),
        () => this.getProducts()
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
            this.addProductForm.get('image').setValue(downloadURL);
            this.addProductForm.get('imageRef').setValue(filename);
          });
        });
      };
    }
  }

}
