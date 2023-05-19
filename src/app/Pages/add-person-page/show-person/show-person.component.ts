import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'show-person',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-person.component.html',
  styleUrls: ['./show-person.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowPersonComponent {

}
