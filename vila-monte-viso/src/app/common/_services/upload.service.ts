import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class UploadService {

  static uploadFile(file) {
    if (file) {
      let imageInfo = { image: '', imageRef: '' };
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const filename = this.generateId() + file.name;
        const ref = firebase.storage().ref();
        const storageRef = ref.child(filename);
        const snapshot = await storageRef.put(file);
        const downloadURL = await snapshot.ref.getDownloadURL();
        imageInfo = {
          image: downloadURL,
          imageRef: filename
        };
        return;
      };
      return imageInfo;
    }
  }

  static async deleteFile(imageRef) {
    if (imageRef) {
      const ref = firebase.storage().ref();
      const storageRef = ref.child(imageRef);
      await storageRef.delete();
    }
  }


  static generateId () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}
