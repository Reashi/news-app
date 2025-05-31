import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService, NewsArticle } from '../../services/news';
import { SliderComponent } from '../../components/slider/slider';

@Component({
  selector: 'app-home',
  imports: [CommonModule, SliderComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  sliderArticles: NewsArticle[] = [];
  newsArticles: NewsArticle[] = [];
  currentPage = 1;
  totalResults = 0;
  pageSize = 20;
  loading = false;
  error: string = '';

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.loading = true;
    this.error = '';
    this.newsService.getTopHeadlines('us', this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        console.log('API Response:', response); // Debug için
        this.totalResults = response.totalResults;
        this.sliderArticles = response.articles.slice(0, 3);
        this.newsArticles = response.articles.slice(3);
        this.loading = false;
      },
      error: (error) => {
        console.error('Haber yüklenirken hata oluştu:', error);
        this.error = `Hata: ${error.message || 'Bilinmeyen hata'}`;
        this.loading = false;
      }
    });
  }

  changePage(page: number) {
    this.currentPage = page;
    this.loadNews();
    window.scrollTo(0, 0);
  }

  get totalPages(): number {
    return Math.ceil(this.totalResults / this.pageSize);
  }

  get pages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  openArticle(url: string) {
    window.open(url, '_blank');
  }

  onImageError(event: any) {
    event.target.style.display = 'none';
    event.target.parentElement.classList.add('no-image');
  }
}
