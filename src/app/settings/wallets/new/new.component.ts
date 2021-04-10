import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-new-wallet',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewWalletComponent
{
  public form = new FormGroup({
    name: new FormControl(),
  });

  constructor
  (
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  )
  {}

  public async onSubmit(e: Event)
  {
    e.preventDefault();

    if (!this.auth.user)
    {
      return;
    }

    const response = await this.api.createWalletForUser({
      name: this.form.get("name")?.value ?? "",
    }, this.auth.user.id);

    Object.entries(this.form.controls).forEach(([ name, control ]) =>
    {
      control.setErrors({
        errors: response.errors?.filter(e => e.field === name)
      });
    });

    if (response.data)
    {
      this.router.navigate([ ".." ], {
        relativeTo: this.route,
      });
    }
  }
}
