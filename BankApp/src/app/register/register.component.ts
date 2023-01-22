import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  //properties
  acno:any;
  pswd:any;
  uname:any;
  userDetails:any;


  // userDetails:any={
  //   1000:{acno:1000,username:"Amal",password:1000,balance:2000},
  //   1001:{acno:1000,username:"Arun",password:1001,balance:2000},
  //   1002:{acno:1000,username:"Akshay",password:1002,balance:2000},
  // }
  constructor(private ds:DataService,private router:Router,private fb:FormBuilder) { }
  
  ngOnInit(): void {
  }
  //model for register
  registerForm=this.fb.group({ //group
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],//array
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
  register(){
    var uname=this.registerForm.value.uname;
    var acno=this.registerForm.value.acno;
    var pswd=this.registerForm.value.pswd;
    // var userDetails=this.ds.userDetails;
      if(this.registerForm.valid){
        const result=this.ds.register(acno,uname,pswd).subscribe(
          (result:any)=>{
            alert(result.message)
            this.router.navigateByUrl('');
          },
          result=>{
            alert(result.error.message)
          }
        )
      }
      else{
        alert('Register Failure')
        console.log(this.registerForm.get('uname')?.errors);
        
      }
    }
  }

