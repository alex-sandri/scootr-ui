import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'add-payment-method',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddPaymentMethodComponent
{
  private walletId?: string;

  public isLoading = false;

  private stripe: Stripe | null = null;

  private cardElement?: StripeCardElement;

  public cardElementError: string = "";

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute)
  {}

  public async ngOnInit(): Promise<void>
  {
    this.stripe = await loadStripe(environment.stripe.key, {
      locale: "it",
    });

    if (this.stripe)
    {
      const elements = this.stripe.elements();

      this.cardElement = elements.create("card");

      this.cardElement.mount("#card-element");

      this.cardElement.on("change", e =>
      {
        this.cardElementError = e.error?.message ?? "";
      });
    }

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

    if (!this.stripe || !this.cardElement || !this.walletId)
    {
      return;
    }

    this.isLoading = true;

    const result = await this.stripe
      .createPaymentMethod({
        type: "card",
        card: this.cardElement,
      });

    if (result.error)
    {
      this.isLoading = false;

      return;
    }

    const response = await this.api.addPaymentMethodToWallet(result.paymentMethod.id, this.walletId);

    if (response.errors)
    {
      this.cardElementError = response.errors[0].error;

      this.isLoading = false;

      return;
    }

    this.router.navigate([ ".." ], {
      relativeTo: this.route,
    });
  }
}
