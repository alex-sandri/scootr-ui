import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDialogButton } from 'src/app/components/dialog/dialog.component';
import { ApiService, IPaymentMethod } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss']
})
export class PaymentMethodsComponent implements OnInit
{
  private walletId?: string;

  public paymentMethods?: IPaymentMethod[];

  public showDialog = false;
  public dialogMessage = "";
  public dialogButtons: IDialogButton[] = [];

  constructor(private api: ApiService, private route: ActivatedRoute)
  {}

  public ngOnInit()
  {
    this.route.params
      .subscribe({
        next: params =>
        {
          this.walletId = params.id;

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
    if (!this.walletId || !this.paymentMethods)
    {
      return;
    }

    const response = await this.api.setDefaultPaymentMethodForWallet(paymentMethod.id, this.walletId);

    if (response.success)
    {
      this.paymentMethods.map(_ =>
      {
        _.__metadata ??= { is_default: false };
        _.__metadata.is_default = paymentMethod.id === _.id;

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

    if (response.errors)
    {
      if (response.errors)
      {
        this.showDialog = true;
        this.dialogMessage = response.errors[0].error;
        this.dialogButtons = [
          {
            text: "OK",
            classes: [ "dark" ],
            onClick: () => this.showDialog = false,
          },
        ];

        return;
      }
    }

    this.paymentMethods = this.paymentMethods.filter(p => p.id !== paymentMethod.id);
  }
}
