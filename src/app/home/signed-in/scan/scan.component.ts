import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsQR from 'jsqr';
import { Point } from 'jsqr/dist/locator';
import { IDialogButton } from 'src/app/components/dialog/dialog.component';
import { ApiService, IWallet } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements AfterViewInit
{
  @ViewChild("video")
  private videoElement?: ElementRef<HTMLVideoElement>;

  @ViewChild("canvas")
  private canvasElement?: ElementRef<HTMLCanvasElement>;

  private canvasContext?: CanvasRenderingContext2D;

  public hasCamera = true;

  private selectedVehicle?: string;

  public shouldShowWalletPicker = false;
  public wallets?: IWallet[];

  public showDialog = false;
  public dialogMessage = "";
  public dialogButtons: IDialogButton[] = [];

  constructor(private api: ApiService, private auth: AuthService, private router: Router, private route: ActivatedRoute)
  {}

  public async ngAfterViewInit()
  {
    if (!this.videoElement || !this.canvasElement)
    {
      return;
    }

    this.canvasContext = this.canvasElement.nativeElement.getContext("2d") ?? undefined;

    const result = await navigator
      .mediaDevices
      .getUserMedia({
        video: {
          facingMode: "environment",
        },
      })
      .catch(() =>
      {
        this.hasCamera = false;
      });

    if (!result)
    {
      return;
    }

    this.videoElement.nativeElement.srcObject = result;

    // Required to tell iOS Safari we don't want fullscreen
    this.videoElement.nativeElement.setAttribute("playsinline", "true");

    this.videoElement.nativeElement.play();

    requestAnimationFrame(() => this.tick());
  }

  private drawLine(start: Point, end: Point, color: string)
  {
    if (!this.canvasContext)
    {
      return;
    }

    this.canvasContext.beginPath();
    this.canvasContext.moveTo(start.x, start.y);
    this.canvasContext.lineTo(end.x, end.y);
    this.canvasContext.lineWidth = 4;
    this.canvasContext.strokeStyle = color;
    this.canvasContext.stroke();
  }

  private tick()
  {
    if (!this.videoElement || !this.canvasElement || !this.canvasContext)
    {
      return;
    }

    if (this.videoElement.nativeElement.readyState === this.videoElement.nativeElement.HAVE_ENOUGH_DATA)
    {
      this.canvasElement.nativeElement.height = this.videoElement.nativeElement.videoHeight;
      this.canvasElement.nativeElement.width = this.videoElement.nativeElement.videoWidth;

      this.canvasContext.drawImage(
        this.videoElement.nativeElement,
        0,
        0,
        this.canvasElement.nativeElement.width,
        this.canvasElement.nativeElement.height,
      );

      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.nativeElement.width,
        this.canvasElement.nativeElement.height,
      );

      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });

      if (code)
      {
        this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
        this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
        this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
        this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");

        this.selectedVehicle = code.data;

        this.showWalletPicker();
      }
    }

    requestAnimationFrame(() => this.tick());
  }

  private async showWalletPicker()
  {
    if (!this.auth.user)
    {
      return;
    }

    this.shouldShowWalletPicker = true;

    const response = await this.api.listWalletsForUser(this.auth.user.id);

    this.wallets = response.data;
  }

  public async startRide(wallet: IWallet)
  {
    if (!this.selectedVehicle)
    {
      return;
    }

    const response = await this.api.startRide({
      vehicle: this.selectedVehicle,
      wallet: wallet.id,
    });

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

    this.router.navigate([ ".." ], {
      relativeTo: this.route,
    });
  }

  public onWalletPickerClick(e: Event)
  {
    const target = e.target as HTMLElement;

    if (target.className === "wallet-picker-container")
    {
      this.shouldShowWalletPicker = false;
    }
  }
}
