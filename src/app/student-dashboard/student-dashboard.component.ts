import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { StudentModel } from './student.model';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  formValue!: FormGroup; 

  studentobj: StudentModel = new StudentModel;

  allstudent: any;

  btnUpdateShow:boolean = false;

  btnSaveShow:boolean = true;


  constructor(private formBuilder:FormBuilder, private api:ApiService ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name:[''],
      email:[''],
      phone:[''],
      streetNo:[''],
      city:[''],
      state:[''],
      country:[''],
      zipcode:[''],
      collageName:[''],
      degree:[''],
      percentage:[''],
      passingYear:[''],
    })
    this.AllStudent();
  }

  AddStudent(){
   
    this.studentobj.name = this.formValue.value.name;
    this.studentobj.email = this.formValue.value.email;
    this.studentobj.phone = this.formValue.value.phone;
    this.studentobj.streetNo = this.formValue.value.streetNo;
    this.studentobj.city = this.formValue.value.city;
    this.studentobj.state = this.formValue.value.state;
    this.studentobj.country = this.formValue.value.country;
    this.studentobj.zipcode = this.formValue.value.zipcode;
    this.studentobj.collageName = this.formValue.value.collageName;
    this.studentobj.degree = this.formValue.value.degree;
    this.studentobj.percentage = this.formValue.value.percentage
    this.studentobj.passingYear= this.formValue.value.passingYear;

    this.api.postStudent(this.studentobj).subscribe({
      next: (v) => {console.log(v)},
    error: (e) => {
      alert("Error")
      console.log(e)},
    complete: () => {
      console.log('complete')
      alert("Data Saved")
      this.AllStudent();
      this.formValue.reset();
    } })

  }

  AllStudent(){
    this.api.getStudent().subscribe(res => {
      this.allstudent = res;
    })
  }

  EditStudent(data:any){
    this.formValue.controls['name'].setValue(data.name);
   
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['phone'].setValue(data.phone);
    this.formValue.controls['streetNo'].setValue(data.streetNo);
    this.formValue.controls['city'].setValue(data.city);
    this.formValue.controls['country'].setValue(data.country);
    this.formValue.controls['zipcode'].setValue(data.zipcode);
    this.formValue.controls['collageName'].setValue(data.collageName);
    this.formValue.controls['degree'].setValue(data.degree);
    this.formValue.controls['percentage'].setValue(data.percentage);
    this.studentobj.id = data.id;
    this.UpdateShowBtn();
  }

  UpdateStudent(){
    this.studentobj.name = this.formValue.value.name;
    this.studentobj.email = this.formValue.value.email;
    this.studentobj.phone = this.formValue.value.phone;
    this.studentobj.streetNo = this.formValue.value.streetNo;
    this.studentobj.city = this.formValue.value.city;
    this.studentobj.state = this.formValue.value.state;
    this.studentobj.country = this.formValue.value.country;
    this.studentobj.zipcode = this.formValue.value.zipcode;
    this.studentobj.collageName = this.formValue.value.collageName;
    this.studentobj.degree = this.formValue.value.degree;
    this.studentobj.percentage = this.formValue.value.percentage
    this.studentobj.passingYear= this.formValue.value.passingYear;
    this.api.putStudent(this.studentobj,this.studentobj.id).subscribe(res => {
      alert("Data Updated");
      this.AllStudent();
      this.SaveShowBtn();
    })


  }


  DeleteStudent(data:any){
    this.api.deleteStudent(data.id).subscribe(res => {
      alert("Record Deleted");
      this.AllStudent();
    })

  }

  UpdateShowBtn()
  {
    this.btnUpdateShow = true;
    this.btnSaveShow = false;
  }
  SaveShowBtn()
  {
    this.btnUpdateShow = false;
    this.btnSaveShow = true;
  }



}
