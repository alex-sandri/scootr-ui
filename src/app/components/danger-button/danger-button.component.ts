import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'danger-button',
  templateUrl: './danger-button.component.html',
  styleUrls: ['./danger-button.component.scss']
})
export class DangerButtonComponent implements OnInit
{
  @Input()
  public text: string = "";

  @Input()
  public alertText: string = "";

  @Output()
  public confirm = new EventEmitter<void>();

  public dialogButtons = [
    {
      text: this.text,
      classes: [ "dark", "danger" ],
      onClick: () => this.onConfirm(),
    },
    {
      text: "Annulla",
      classes: [ "dark" ],
      onClick: () => this.showConfirmDialog = false,
    },
  ];
  public showConfirmDialog = false;

  constructor()
  {}

  public ngOnInit()
  {
    // The actual input value is not set when constructing the component
    this.dialogButtons[0].text = this.text;
  }

  public onConfirm()
  {
    this.showConfirmDialog = false;

    this.confirm.emit();
  }
}
