import { EmpleadoModel } from '../models/EmpleadoModel'; // importamos el modelo
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class empleadosService {
  public URL: string;

  constructor(private httpClient: HttpClient) {
    this.URL = 'http://localhost:4000/api/';
  }

  // aca se hacen las peticiones a la api

  //Muestra los empleados
  getEmpleados(): Observable<any> {
    return this.httpClient.get(this.URL + 'employees');
  }

  // creamos un empleado
  createEmpleados(empleado: EmpleadoModel): Observable<any> {
    return this.httpClient.post(
      'http://localhost:4000/api/employees/',
      empleado
    );
  }

  // el id es un string
  deleteEmpleados(_id: string) {
    return this.httpClient.delete('http://localhost:4000/api/employees/' + _id);
  }

  // le paso todos los empleados
  editEmpleado(empleado: EmpleadoModel) {
    return this.httpClient.put(
      'http://localhost:4000/api/employees/' + empleado._id,
      empleado
    );
    // return this.httpClient.put(this.URL + `/${empleado._id}`, empleado);
  }
}
