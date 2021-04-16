import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-funds',
  templateUrl: './add-funds.component.html',
  styleUrls: ['./add-funds.component.scss']
})
export class AddFundsComponent implements OnInit
{
  public walletId?: string;

  public isLoading = false;

  private stripe: Stripe | null = null;

  public form = new FormGroup({
    wallet: new FormControl(),
    amount: new FormControl(),
    is_subscription: new FormControl(false),
  });

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute)
  {}

  public async ngOnInit()
  {
    this.stripe = await loadStripe(environment.stripe.key, {
      locale: "it",
    });

    this.route.params
      .subscribe({
        next: params =>
        {
          this.walletId = params.id;
        },
      });
  }

  public async onSubmit(e: Event)
  {
    e.preventDefault();

    if (!this.stripe || !this.walletId)
    {
      return;
    }

    this.isLoading = true;

    const isSubscription = this.form.get("is_subscription")?.value ?? false;

    const response = await this.api.addFundsToWallet(this.walletId, {
      amount: this.form.get("amount")?.value ?? 0,
      is_subscription: isSubscription,
    });

    Object.entries(this.form.controls).forEach(([ name, control ]) =>
    {
      control.setErrors({
        errors: response.errors?.filter(e => e.field === name)
      });
    });

    if (!isSubscription && response.data)
    {
      const result = await this.stripe.confirmCardPayment(response.data.client_secret);

      if (result.error)
      {
        console.log(result.error.message);

        return;
      }

      this.router.navigate([ ".." ], {
        relativeTo: this.route,
      });
    }

    this.router.navigate([ ".." ], {
      relativeTo: this.route,
    });

    this.isLoading = false;
  }
}
