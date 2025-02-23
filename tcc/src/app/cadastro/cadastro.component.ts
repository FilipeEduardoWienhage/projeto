import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { InputText, InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputMask } from 'primeng/inputmask';
import { DatePicker } from 'primeng/datepicker';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { CommonModule } from '@angular/common';


interface Endereco {
  uf: string,
  localidade: string,
  bairro: string,
}

@Component({
  selector: 'app-cadastro',
  imports: [
    FooterComponent,
    InputTextModule,
    FormsModule,
    InputMask,
    DatePicker,
    PasswordModule,
    ButtonModule,
    StepperModule,
    CommonModule,
    InputText
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  activeStep: number = 1;

  nome: string = "";

  email: string = "";

  password: string = "";

  confirmarSenha: string = '';

  cpf: string = ""

  cep: string = '';

  dataNascimento: Date[] | undefined;

  estado: string = '';

  cidade: string = '';

  bairro: string = '';

  endereco: Endereco = {
    uf: '',
    localidade: '',
    bairro: '',
  };


  buscarEndereco(): void {
    let cep = this.cep.replace("-", "").replace("_", "").replace(".", "");

    if (cep.length === 8) {
      const viaCepUrl = `https://viacep.com.br/ws/${cep}/json/`;

      fetch(viaCepUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro na resposta da API');
          }
          return response.json();
        })
        .then((data) => {
          if (!data.erro) {
            // Atualiza as propriedades vinculadas aos inputs
            this.estado = data.uf;
            this.cidade = data.localidade;
            this.bairro = data.bairro;
            console.log('Endereço encontrado:', data);
          } else {
            alert('CEP não encontrado!');
          }
        })
        .catch((error) => {
          console.error('Erro ao buscar o CEP:', error);
          alert('Erro ao buscar o CEP!');
        });
    } else {
      alert('Digite um CEP válido (8 números)!');
    }
  }
}

