import { Component, OnInit } from '@angular/core';
import { Symptoms } from '../shared/symptoms';
import { ActivatedRoute, Router } from '@angular/router';
import { SymptomsService } from './../shared/symptoms.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-symptoms-form',
  templateUrl: './symptoms-form.page.html',
  styleUrls: ['./symptoms-form.page.scss'],
})
export class SymptomsFormPage implements OnInit {
  symptoms: Symptoms;
  private symptomsId: string;
  title: string;

  constructor(private activateRoute: ActivatedRoute,
              private symptomsService: SymptomsService,
              private router: Router,
              private toast: ToastService) { }

  ngOnInit(){
    this.symptoms = new Symptoms();
    this.symptomsId = this.activateRoute.snapshot.params['id'];
    this.symptomsId ? this.title = "EDITAR Sintoma" : this.title = "NOVO Sintoma";

    if(this.symptomsId){
      const subscribe = this.symptomsService.getById(this.symptomsId).subscribe( (data: any) =>{
       subscribe.unsubscribe();
       const { name, description, imgUrl, filePath } = data;
       this.symptoms.name = name;
       this.symptoms.description = description;
    })
  }

}

  async onSubmit(){
    console.log(this.symptoms)
    // this.symptomsId = this.activateRoute.snapshot.params['id'];
    if (this.symptomsId){
      // Update
      try {
        await this.symptomsService.updateSymptoms(this.symptoms, this.symptomsId);
        // mensagem OK
        this.toast.showMessageBottom('Sintomas alterado com sucesso!!', 'success')
        this.router.navigate(['/symptoms-list'])
      } catch (error) {
        // mensagem error
        this.toast.showMessageTop(error, 'danger');
        console.log(error);
      }
    } else {
      // Add
      try {
        await this.symptomsService.addSymptoms(this.symptoms);
        // mensagem OK
        this.toast.showMessageBottom('Sintomas inserido com sucesso!!', 'success')
        this.router.navigate(['/symptoms-list'])
      } catch (error) {
        // mensagem error
        this.toast.showMessageTop(error, 'danger');
        console.log(error);
      }

    }
  }
}
