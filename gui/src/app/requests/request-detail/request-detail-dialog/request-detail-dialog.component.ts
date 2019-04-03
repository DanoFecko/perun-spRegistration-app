import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {DialogData} from "../request-detail.component";

@Component({
  selector: 'app-request-detail-dialog',
  templateUrl: './request-detail-dialog.component.html',
  styleUrls: ['./request-detail-dialog.component.scss']
})
export class RequestDetailDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RequestDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void{
    if (this.data.isApprove){
      this.data.parent.approve();
    } else {
      this.data.parent.reject();
    }
  }

  ngOnInit() {
  }

}
