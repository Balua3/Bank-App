import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
currentUser:any; //To hold current username
currentAcno:any; //To hold current acno

  userDetails:any={
    1000:{acno:1000,username:"Amal",password:1000,balance:2000,transaction:[]},
    1001:{acno:1000,username:"Arun",password:1001,balance:2000,transaction:[]},
    1002:{acno:1000,username:"Akshay",password:1002,balance:2000,transaction:[]},
  }

  constructor(private http:HttpClient) { 
    // this.getDetails();
  }

    saveDetails(){
      //dataBase
      if(this.userDetails){
        localStorage.setItem('Database',JSON.stringify(this.userDetails))
      }
      //currentUser
      if(this.userDetails){
        localStorage.setItem('currentUser',JSON.stringify(this.currentUser))
      }
      //currentAcno
      if(this.userDetails){
        localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno))
      }
    }

    // getDetails(){
    //   //dataBase
    //   if(localStorage.getItem('Database')){
    //     this.userDetails = JSON.parse(localStorage.getItem('Database')||'')
    //   }
      
    //   //currentAcno
    //   if(localStorage.getItem('currentAcno')){
    //     this.currentAcno = JSON.parse(localStorage.getItem('currentAcno')||'')
    //   }
    //   //currentUser
    //   if(localStorage.getItem('currentUser')){
    //     this.currentUser = JSON.parse(localStorage.getItem('currentUser')||'')
    //   }
    // }

    register(acno:any,username:any,password:any){
    
      const body={
        acno,
        username,
        password
      }
      return this.http.post('http://localhost:3000/register',body)
    }

    
  
  login(acno:any,password:any){
    const body={
      acno,
      password
    }
    return this.http.post('http://localhost:3000/login',body)
  }
  getToken(){
    //fetch the token from local storage
    const token = JSON.parse(localStorage.getItem('Token')||'');
    //generate header
    let headers=new HttpHeaders()
    //append token inside the header
    if(token){
      options.headers=headers.append ('x-access-token',token)
    }
    return options
  }
  //deposit call
    deposit(acno:any,password:any,amt:any){
    
      const body={
        acno,
        password,
        amount:amt
      
      }
      return this.http.post('http://localhost:3000/deposit',body,this.getToken())

    }


    withdraw(acno:any,password:any,amt:any){
      const body={
        acno,
        password,
        amount:amt
      }
      return this.http.post('http://localhost:3000/withdraw',body,this.getToken())
    }
    getTransaction(acno:any){
      const body={
        acno
      }
     return this.http.post('http://localhost:3000/transaction',body,this.getToken())
    }

    deleteAcc(acno:any){
      return this.http.delete('http://localhost:3000/deleteAcc/'+acno)
    }
  }