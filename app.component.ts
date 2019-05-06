import { Component,OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators, FormControl} from '@angular/forms'
//import {PasswordEditorComponent} from './password-editor/password-editor.component'
import {USERS} from './mock-users';
import {User} from './user';
import { emailPatternValidator } from "../app/validators/email-pattern-validator";
import {Observable,from} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import{MatAutocompleteTrigger} from '@angular/material';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {



  trigger: MatAutocompleteTrigger;
  users=USERS;
  selectedUser:User;
  rForm: FormGroup;
  post:any;                     // A property for our submitted form
  email:string = '';
  name:string = '';
  designation:string='';
  teamName:string='';
  skill:string='';
  phoneNumber:string='';
  password:string='';
  image:string='';
  newTeamControl:string='';
  titleAlert:string='This field is required';
  wrongEmailPatternAlert:string='Invalid email';
  phonePatternAlert:string='Phone number must contain 11-13 digits';
  emailPattern=/.+\@.+\..+/ ;
  phoneNumberPattern="/\+?(88)?0?1[56789][0-9]{8}\b/";
  //teams=[{teamName:'BrainJack'}, {teamName:'IntelliFriend'},{teamName:'ML'}]
  teams:string[]=['BrainJack','IntelliFriend','ML'];
  filteredOptions:Observable<string []>;
  //isValidFormSubmitted = false;
  filteredValues:string[];
  myControl=new FormControl();
bool=false;
 
  constructor(private formBuilder:FormBuilder){

    this.rForm=formBuilder.group({
      
      'name':[this.users[0].name,Validators.required],
      'designation':[this.users[0].designation,Validators.required],
      'teamNameControl':[this.users[0].teamName,Validators.required],
      'skill':[this.users[0].skill],
      'email':[this.users[0].email,Validators.compose([Validators.required,emailPatternValidator])],
      'phoneNumber':[this.users[0].phoneNumber, Validators.compose([Validators.minLength(11),Validators.maxLength(13),Validators.pattern(/\+?(88)?0?1[56789][0-9]{8}\b/)])],
      'newTeamControl':'',
      //'myControl':'',
      'validate': ''
    });
  }


   arraySource=from(this.teams);
  

  teamObservable=this.arraySource.subscribe(val => console.log(val));
  addToTeamList(){

    
    console.log(this.rForm.get('newTeamControl').value);
    this.teams.push(this.rForm.get('newTeamControl').value);
    console.log('Team was added');
    console.log(this.teams);
  }

  
  

  
  addPost(post){
   
    this.email=post.email;
    this.name=post.name;
    this.designation=post.designation;
    this.teamName=post.teamName;
    this.phoneNumber=post.phoneNumber;
    this.skill=post.skill;
    this.newTeamControl=post.newTeamControl;
  
  
  
  }

  ngOnInit(){
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log(value);


    console.log('arraysource '+this.arraySource);
    let ret= this.teams.filter(team => team.toLowerCase().includes(filterValue));
    console.log(ret);
    console.log(typeof(ret));
    const source=from(ret);
    console.log("Source "+source);
    console.log("Type of source "+typeof(source));    
    
     return ret;
  }
  
  onFocus(){
    this.bool=!this.bool;
   // this.trigger._onChange("");
    //this.trigger.openPanel;
  }



  onSelect(user: User): void {
    this.selectedUser = user;
  }


  get userName() {
    return this.rForm.get('name');
 }

 get userPhoneNumber() {
    return this.rForm.get('phoneNumber');
 }    
 get userEmail() {
    return this.rForm.get('email');
 }     
 
 get userDesignation(){
   return this.rForm.get('designation');
 }

 get userTeamName(){
   return this.rForm.get('teamName');

 }

 get userSkill(){
   return this.rForm.get('skill');
 }
}
