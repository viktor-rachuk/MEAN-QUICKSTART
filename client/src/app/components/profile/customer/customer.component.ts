import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// jQuery and Toastr
declare var $: any;
@Component({
  selector: 'customer-profile',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerProfileComponent implements OnInit {
  user: any;
  email_valid = true;
  old_email: any;
  customer: any = {};
  filesToPhoto: Array<File> = [];
  confirmPassword: any;
  photo: File;
  location: Location;
  user_info: any =  {};
  customer_info: any = {};
  photoUrl: string;
  toastr_options = {
    positionClass: 'toast-bottom-right',
    closeButton: true,
    progressBar: true
  };
  constructor(
      private http: Http,
      private router: Router,
      private toastr: ToastrService,
      private userService: UsersService
    ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.photoUrl = '/uploads/logo/' + this.user.photo;
    // Get All Companies
    this.getUserDetails();
  }

  getUserDetails() {
    this.userService.getUserDetails(this.user.id).then((res) => {
      this.customer = res['user'];
      this.old_email = this.customer.email;
      this.user_info = this.customer['user_info'];
      this.customer_info = this.customer['customer_info'];
      }, (err) => {
      console.log(err);
    });
  }

  onSubmit() {
    const customer = {};
    if (this.photo) {
      this.uploadPhoto();
    }
    customer['userid'] = this.customer['userid'];
    customer['customer_info'] = this.customer_info;
    customer['username'] = this.customer['username'].trim();
    customer['user_info'] = this.user_info;
    customer['id'] = this.customer['id'];
    customer['accounttype'] = 'customer';
    customer['email'] = this.customer['email'].trim();
    customer['photo'] = this.customer['photo'];
    customer['password'] = this.customer['password'];
    if (this.customer['role'] ) {
      customer['role'] = this.customer['role'];
    }
    if (this.customer['special_permissions']) {
      customer['special_permissions'] = this.customer['special_permissions'];
    }
    this.userService.updateUser(customer['id'], customer).then((result) => {
      if (!result['success']) {
        this.toastr.error('Sorry, cannot edit this user, please try again', '', this.toastr_options);
      } else {
        this.toastr.success('Success !!!', '', this.toastr_options);
        this.router.navigate(['/users']);
      }
      }, (err) => {
      console.log(err);
    });
  }
  uploadPhoto() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToPhoto;
    formData.append('uploads[]', files[0], files[0]['name']);
    this.http.post('upload', formData)
      .map(res => res.json())
      .subscribe(res => console.log(res));
    this.customer['photo'] = files[0]['name'];
  }
  readPhoto(event: any) {

    if (event.target.files && event.target.files[0]) {
      this.filesToPhoto = <Array<File>>event.target.files;
      this.photo = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ( e: any) => {
        this.photoUrl = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  cancel() {
    window.history.back();
  }

  validateEmail(email: string) {
    if (this.old_email !== email) {
      this.userService.checkEmail(email).then(res => {
        if (res['success']) {
          this.email_valid = true;
        } else {
          this.email_valid = false;
        }
      }, err => {
        console.log(err);
      });
    }
  }

  setEmailValid() {
    this.email_valid = true;
  }


}
