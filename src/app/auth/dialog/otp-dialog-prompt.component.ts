import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-opt-dialog-prompt',
  templateUrl: 'opt-dialog-prompt.component.html',
  styleUrls: ['otp-dialog-prompt.component.scss'],
})
export class OtpDialogPromptComponent {

  constructor(protected ref: NbDialogRef<OtpDialogPromptComponent>) {}

  cancel() {
    this.ref.close();
  }

  submit(code) {
    this.ref.close(code);
  }

}
