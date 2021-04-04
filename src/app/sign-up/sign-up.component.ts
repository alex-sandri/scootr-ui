import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent
{
  public readonly form = new FormGroup({
    first_name: new FormControl(),
    last_name: new FormControl(),
    email: new FormControl(),
    birth_date: new FormControl(),
    fiscal_number: new FormControl(),
  });

  public showEmailSignInSuccessMessage = false;

  constructor(private api: ApiService, private router: Router)
  {}

  public async onSubmit(e: Event)
  {
    e.preventDefault();

    const response = await this.api.createUser({
      first_name: this.form.get("first_name")?.value ?? "",
      last_name: this.form.get("last_name")?.value ?? "",
      email: this.form.get("email")?.value ?? "",
      birth_date: this.form.get("birth_date")?.value ?? "",
      fiscal_number: this.form.get("fiscal_number")?.value ?? "",
    });

    Object.entries(this.form.controls).forEach(([ name, control ]) =>
    {
      control.setErrors({
        errors: response.errors?.filter(e => e.field === name)
      });
    });

    if (response.data)
    {
      this.router.navigateByUrl("/signin");
    }
  }
}
