import { Component, Input } from '@angular/core';
import { InertiaPage } from '../../inertia/inertia-page.decorator';

@InertiaPage('about')
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  @Input() message = '';
}
