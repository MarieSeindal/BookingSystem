import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
	imports: [CommonModule, MatButtonModule, MatIconModule, MatToolbarModule, RouterLink, RouterOutlet],
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLayoutComponent {

}
