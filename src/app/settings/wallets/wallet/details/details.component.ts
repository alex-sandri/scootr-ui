import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IWallet } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-wallet-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class WalletDetailsComponent implements OnInit
{
  public wallet?: IWallet;

  public form = new FormGroup({
    name: new FormControl(),
  });

  constructor(private api: ApiService, private route: ActivatedRoute)
  {}

  public ngOnInit()
  {
    this.route.params
      .subscribe({
        next: params =>
        {
          this.api
            .retrieveWallet(params.id)
            .then(response =>
            {
              this.wallet = response.data;

              this.form.get("name")?.setValue(this.wallet?.name);
            });
        },
      });
  }

  public async onSubmit(e: Event)
  {
    e.preventDefault();

    if (!this.wallet)
    {
      return;
    }

    const response = await this.api.updateWallet(this.wallet.id, {
      name: this.form.get("name")?.value ?? "",
    });

    Object.entries(this.form.controls).forEach(([ name, control ]) =>
    {
      control.setErrors({
        errors: response.errors?.filter(e => e.field === name)
      });
    });
  }
}
