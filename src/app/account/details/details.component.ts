import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent
{
  constructor(private api: ApiService, public auth: AuthService)
  {}

  public async deleteAccount()
  {
    if (!this.auth.user)
    {
      return;
    }

    const response = await this.api.deleteUser(this.auth.user.id);

    if (response.success)
    {
      await this.auth.signOut();
    }
  }
}
