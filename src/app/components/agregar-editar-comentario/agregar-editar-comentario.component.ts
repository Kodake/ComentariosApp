import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comentario } from 'src/app/models/comentario';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-agregar-editar-comentario',
  templateUrl: './agregar-editar-comentario.component.html',
  styleUrls: ['./agregar-editar-comentario.component.css']
})
export class AgregarEditarComentarioComponent implements OnInit {

  comentarios: FormGroup;
  idComentario = 0;
  accion = 'Agregar';
  loading = false;
  comentario: Comentario;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private comentarioService: ComentarioService, private router: Router) {
    this.comentarios = this.formBuilder.group({
      titulo: ['', Validators.required],
      creador: ['', Validators.required],
      texto: ['', Validators.required]
    });

    if (+this.route.snapshot.paramMap.get('id') > 0) {
      this.idComentario = +this.route.snapshot.paramMap.get('id');
    }
  }

  ngOnInit(): void {
    this.esEditar();
  }

  guardarComentario() {
    if (this.accion === 'Agregar') {
      const comentario: Comentario = {
        titulo: this.comentarios.get('titulo').value,
        creador: this.comentarios.get('creador').value,
        texto: this.comentarios.get('texto').value,
        fechaCreacion: new Date(),
      };
      this.comentarioService.guardarComentario(comentario).subscribe(data => {
        this.router.navigate(['/']);
      });
    } else {
      const comentario: Comentario = {
        id: this.comentario.id,
        fechaCreacion: this.comentario.fechaCreacion,
        titulo: this.comentarios.get('titulo').value,
        creador: this.comentarios.get('creador').value,
        texto: this.comentarios.get('texto').value
      };
      this.comentarioService.actualizarComentario(this.idComentario, comentario).subscribe(data => {
        this.router.navigate(['/']);
      });
    }
  }

  esEditar() {
    if (this.idComentario > 0) {
      this.accion = 'Editar';
      this.comentarioService.cargarComentario(this.idComentario).subscribe(data => {
        this.comentario = data;

        this.comentarios.patchValue({
          titulo: data.titulo,
          creador: data.creador,
          texto: data.texto
        });
      });
    }
  }
}