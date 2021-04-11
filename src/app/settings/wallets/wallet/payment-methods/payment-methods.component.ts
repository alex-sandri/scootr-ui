import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss']
})
export class PaymentMethodsComponent implements OnInit
{
  public paymentMethods?: IPaymentMethod[];

  constructor(private api: ApiService, private route: ActivatedRoute)
  {}

  public ngOnInit()
  {
    this.route.params
      .subscribe({
        next: params =>
        {
          this.api
            .listPaymentMethodsForWallet(params.id)
            .then(response =>
            {
              this.paymentMethods = response.data;
            });
        },
      });
  }

  public async setDefaultPaymentMethod(paymentMethod: IPaymentMethod)
  {
    if (!this.wallet || !this.paymentMethods)
    {
      return;
    }

    const response = await this.api.setDefaultPaymentMethodForWallet(paymentMethod.id, this.wallet.id);

    if (!response.errors)
    {
      this.paymentMethods.map(_ =>
      {
        _.is_default = paymentMethod.id === _.id;

        return _;
      });
    }
  }

  public async removePaymentMethod(paymentMethod: IPaymentMethod)
  {
    if (!this.paymentMethods)
    {
      return;
    }

    const response = await this.api.deletePaymentMethod(paymentMethod.id);

    if (!response.errors)
    {
      this.paymentMethods = this.paymentMethods.filter(p => p.id !== paymentMethod.id);
    }
  }
}
