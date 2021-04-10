import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'danger-button',
  templateUrl: './danger-button.component.html',
  styleUrls: ['./danger-button.component.scss']
})
export class DangerButtonComponent
{
  @Input()
  public text: string = "";

  @Input()
  public alertText: string = "";

  @Output()
  public confirm = new EventEmitter<void>();

  public showConfirmDialog = false;

  constructor()
  {}

  public onDialogContainerClick(e: Event)
  {
    const target = e.target as HTMLElement;

    if (target.className === "dialog-container")
    {
      this.showConfirmDialog = false;
    }
  }

  public onConfirm()
  {
    this.showConfirmDialog = false;

    this.confirm.emit();
  }
}
