import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {//3rd executed
//class ia a collection of properties and methods.
  constructor(private ds:DataService,private router:Router,private fb:FormBuilder) { //lst executed
                  //used for object initialization
                  //It automatically invokes when an object is created.
  }
  ngOnInit(): void {//2nd executed
                    //Initial process of a component
                    //when a component is created, at same time it initialize or authorize
                    //When a component is created, there is a lifecycle for it.
  }

  //model for register
  
  //properties

  aim="Your perfect banking partner"

  account="Please enter your acno"

  // acno:any;
  acno=""; //to hold the value from the user

  pswd:any;

  // userDetails:any={
  //   1000:{acno:1000,username:"Amal",password:1000,balance:2000},
  //   1001:{acno:1000,username:"Arun",password:1001,balance:2000},
  //   1002:{acno:1000,username:"Akshay",password:1002,balance:2000},
  // }
  //userdefined functions//4th executed

  loginForm=this.fb.group({ //group
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  login(){
    var acno=this.loginForm.value.acno;
    var pswd=this.loginForm.value.pswd;
    // var userDetails=this.ds.userDetails;
    if(this.loginForm.valid){
      this.ds.login(acno,pswd).subscribe(
        (result:any)=>{
            // alert('Login Successful')
            // localStorage.setItem('name',JSON.stringify(result))
            localStorage.setItem('currentUser',JSON.stringify(result.currentUser))
            localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
            localStorage.setItem('Token',JSON.stringify(result.token))

            alert(result.message)
            this.router.navigateByUrl('dashboard');
          },

          result=>{
            alert(result.error.message)
          }
      )

    // if(result){
    //   alert('Login successful')
    //   this.router.navigateByUrl('dashboard')
    // }
    // else{
    //   alert('login failure')
    //   console.log(this.loginForm.get('acno')?.errors)
    //   console.log(this.loginForm.get('pswd')?.errors)

    // }
    // alert('Login clicked');
  // }
  // acnoChange(event:any){
  //   // console.log(event.target.value);
  //   this.acno = event.target.value;//1000
  //   console.log(this.acno);
    
  // }
  // pswdChange(event:any){
  //   // console.log(event.target.value);
  //   this.pswd = event.target.value;
  //   console.log(this.pswd);
    
  }
 }
}