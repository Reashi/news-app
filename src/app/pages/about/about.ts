import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent {

  openPortfolio() {
    window.open('https://reashi.github.io/', '_blank');
  }
  openLinkedin() {
    window.open('https://www.linkedin.com/in/reashi/', '_blank');
  }
  openGithub() {
    window.open('https://github.com/Reashi', '_blank');
  }
}
