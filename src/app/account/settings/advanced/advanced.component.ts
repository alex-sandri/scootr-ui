import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-advanced-settings',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss']
})
export class AdvancedSettingsComponent
{
  constructor(private api: ApiService, private auth: AuthService)
  {}

  public async createExport()
  {
    if (!this.auth.user)
    {
      return;
    }

    const response = await this.api.createExport(this.auth.user.id);

    if (response.success)
    {
      // TODO
    }
  }

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
