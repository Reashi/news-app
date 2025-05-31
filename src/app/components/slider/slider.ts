import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsArticle } from '../../services/news';

@Component({
  selector: 'app-slider',
  imports: [CommonModule],
  templateUrl: './slider.html',
  styleUrl: './slider.css'
})
export class SliderComponent implements OnInit {
  @Input() articles: NewsArticle[] = [];
  currentSlide = 0;

  ngOnInit() {
    this.startAutoSlide();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.articles.length;
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.articles.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  startAutoSlide() {
    setInterval(() => {
      if (this.articles.length > 0) {
        this.nextSlide();
      }
    }, 5000);
  }

  openArticle(url: string) {
    window.open(url, '_blank');
  }

  onImageError(event: any) {
    event.target.style.display = 'none';
    event.target.parentElement.classList.add('no-image');
  }
}
