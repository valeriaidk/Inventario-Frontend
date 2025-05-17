import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-producto',
  standalone: false,
  templateUrl: './editar-producto.component.html',
})
export class EditarProductoComponent  {
  producto: Producto = new Producto();
  id: number;

  constructor(
    private productoServicio: ProductoService,
    private ruta: ActivatedRoute,
    private enrutador: Router
  ) {}

  ngOnInit(): void {
    this.id = this.ruta.snapshot.params['id'];
    this.productoServicio.obtenerProductosporId(this.id).subscribe(
      {
        next:(datos) => this.producto = datos,
        error: (errores:any) => console.log(errores)
      }
    );
  }
  onSubmit(){
    this.guardarProducto();
  }
  guardarProducto(){
    this.productoServicio.editarProducto(this.id,this.producto).subscribe(
      {
        next: (datos) => this.enrutador.navigate(['/productos']),
        error: (errores) => console.log
      }
    )
  }

}
