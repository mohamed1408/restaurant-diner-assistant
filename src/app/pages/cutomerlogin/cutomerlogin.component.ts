import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cutomerlogin',
  imports: [FormsModule],
  templateUrl: './cutomerlogin.component.html',
  styleUrl: './cutomerlogin.component.scss',
  animations: [
    trigger('shake', [
      transition('* => *', [
        animate('200ms ease-in', keyframes([
          style({ transform: 'translateX(0)' }),
          style({ transform: 'translateX(-5px)' }),
          style({ transform: 'translateX(5px)' }),
          style({ transform: 'translateX(-5px)' }),
          style({ transform: 'translateX(5px)' }),
          style({ transform: 'translateX(0)' })
        ]))
      ])
    ])
  ]
})
export class CutomerloginComponent implements OnInit {
  returnUrl: string = '/';
  name: string = '';
  phonenumber: string = '';
  invalid_marker: { name: number, phonenumber: number, shakeState: boolean } = { name: 0, phonenumber: 0, shakeState: false };

  constructor(private route: ActivatedRoute, private router: Router, private authservice: AuthService) {

  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    if (this.validate()) {
      localStorage.setItem('login.customer', JSON.stringify({ name: this.name, phonenumber: this.phonenumber }));
      localStorage.setItem('kotno', '1');
      localStorage.setItem('orders.pending', JSON.stringify([]));
      localStorage.setItem('orders.completed', JSON.stringify([]));
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  validate(): boolean {
    if (this.name.trim() === '' || this.phonenumber.trim() === '') {
      if (this.name.trim() === '') this.invalid_marker.name = -1;
      if (this.phonenumber.trim() === '') this.invalid_marker.phonenumber = -1;
      this.invalid_marker.shakeState = !this.invalid_marker.shakeState;
      console.log(this.name, this.phonenumber);
      console.log(this.invalid_marker);
      return false;
    }
    return true;
  }
}
