import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, ITransaction } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit
{
  public transactions?: ITransaction[];

  constructor(private api: ApiService, private route: ActivatedRoute)
  {}

  public ngOnInit()
  {
    this.route.params
      .subscribe({
        next: async params =>
        {
          const response = await this.api.listTransactionsForWallet(params.id);

          this.transactions = response.data;
        },
      });
  }
}
