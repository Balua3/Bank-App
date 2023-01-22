import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
acno:any;
pswd:any;
amount:any;
acno1:any;
pswd1:any;
amount1:any;

user:any; //To hold current username
sdate:any;
  constructor(private ds:DataService,private fb:FormBuilder,private router:Router,private http:HttpClient) { 

  if(localStorage.getItem('currentUser')){
    this.user=JSON.parse(localStorage.getItem('currentUser')||'')
    this.sdate= Date()
    console.log(localStorage);
  }
}

  ngOnInit(): void {

    if(!localStorage.getItem('currentAcno')){
      alert('please login first')
      this.router.navigateByUrl('')
    }
    
  }
  //model for register
  depositForm=this.fb.group({ //group
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]

  })

  deposit(){
    // alert('Deposit is already')
    var acno = this.depositForm.value.acno;
    var password = this.depositForm.value.password;
    var amount = this.depositForm.value.amount;
    if(this.depositForm.valid){
      this.ds.deposit(acno,password,amount).subscribe((result:any)=>{
        //response
        alert(result.message);
      },
      (result:any)=>{
        alert(result.error.message);
      }
      )
    }
  }

    withdrawForm=this.fb.group({ //group
      acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
      password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
      amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
    })
  withdraw(){
    // alert('Withdraw is already')
      // alert('Deposit is already')
      var acno = this.withdrawForm.value.acno;
      var password = this.withdrawForm.value.password;
      var amount = this.withdrawForm.value.amount;
    
      if(this.withdrawForm.valid){
        this.ds.withdraw(acno,password,amount).subscribe(
      (result:any)=>{
        alert(result.message);
      },
      result=>{
        alert(result.error.message)
      }
        )
    }
      else{
        alert('invalid details')
        // console.log(this.depositForm.get('acno')?.errors);
      }
      }

    logout(){
      // alert('Logout')
      localStorage.removeItem('currentAcno');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('Token');
      this.router.navigateByUrl('')
    }

    delete(){
      // alert('Deleted')
      
        this.acno = JSON.parse(localStorage.getItem('currentAcno')||'')
        // this.acno=this.ds.currentAcno;
      
    }
    onCancel(){
      this.acno="";
    }
    onDelete(event:any){
      // alert(event)
      this.ds.deleteAcc(event).subscribe(
        (result:any)=>{
          alert(result.message)//user deleted
          this.router.navigateByUrl('')
        },
        result=>{
          alert(result.error.message)
        }
      )
    }
}