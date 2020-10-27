import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  form: any = [];

  constructor(private router:Router, private toastr: ToastrService) { }

  ngOnInit() {
    $.getScript("../assets/js/modal.js"); 
  }

  abrirModal(){
    $('#exampleModal').modal('show'); 
  }

  guardarUsuario(){
    if(this.form.nombres != null && this.form.correo !=null && this.form.status != null){
      localStorage.setItem("nombre",this.form.nombres);
      localStorage.setItem("correo",this.form.correo);
        this.router.navigate(['quiz']); 
    }else{
        this.toastr.warning("Los datos son obligatorios");
    }
  }

public onSaveUsernameChanged(value:boolean){
    this.form.status = value;
}

}
