import { Component, OnInit } from '@angular/core';

// importamos el servicio
import { empleadosService } from './../service/empleadosService.service';

// importamos el modelo
import { EmpleadoModel } from './../models/EmpleadoModel';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
  providers: [empleadosService],
})
export class EmpleadosComponent implements OnInit {
  public empleadosModelo: EmpleadoModel[];
  public empleadoDataBinding: EmpleadoModel; // con esta variable crearemos un objeto que aremos databinding

  constructor(public empleadoService: empleadosService) {
    this.empleadoDataBinding = new EmpleadoModel('', '', '', '', '');
  }

  //hook
  ngOnInit() {
    this.mostrarDatos();
  }

  mostrarDatos() {
    this.empleadoService.getEmpleados().subscribe(
      (response) => {
        this.empleadosModelo = response; // lo que tenga el response agregalo al modelo
        console.log(response); // muestra los datos
      },
      (err) => {
        console.log(<any>err);
      }
    );
  }

  // le paso un formulaio(form) ,vas a recibir un ngForm
  agregarEmpleados(form: NgForm) {
    if (form.value._id) {
      // le pasos todo slos datos que tienen los empleados
      this.empleadoService.editEmpleado(form.value).subscribe(
        (res) => {
          this.mostrarDatos();
          form.reset();
          console.log(res);
        },
        (err) => {
          console.log(<any>err);
        }
      );
    } else {
      this.empleadoService.createEmpleados(form.value).subscribe(
        (res) => {
          console.log(res);
          this.mostrarDatos();
          form.reset();
        },
        (err) => {
          console.log(<any>err);
        }
      );
    }
  }

  eliminarEmpleado(id) {
    if (confirm('are you sure you want to delete it?')) {
      this.empleadoService.deleteEmpleados(id).subscribe(
        (res) => {
          console.log(res);
          this.mostrarDatos();
        },
        (err) => {
          console.log(<any>err);
        }
      );
    }
  }

  //le esoy pasando todos los datos del modelo
  editarEmpleado(empleado: EmpleadoModel) {
    //1-mostrame el empleado q hsiste click
    //2-lo que tenga empleado daselo a this.empleadodatabinding()
    //3-hacemos data binding sobre empleado
    this.empleadoDataBinding = empleado;
    console.log(empleado);
  }
} // fin clase
