import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
})
export class VerifyComponent implements OnInit {
  public verifyForm: FormGroup = new FormGroup({
    city: new FormControl(''),
    panNumber: new FormControl(''),
  });
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.verifyForm = this.fb.group({
      city: ['', Validators.required],
      panNumber: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }
}
