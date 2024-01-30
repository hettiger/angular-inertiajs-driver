import { Component, Input } from '@angular/core';
import { InertiaPage } from '../../inertia/inertia-page.decorator';

@InertiaPage('home')
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @Input() message = '';
}
