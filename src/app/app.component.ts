import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'eycho';
  constructor(private router: Router) {}
  navigate(path: string) {
    this.router.navigateByUrl(path);
  }
}
