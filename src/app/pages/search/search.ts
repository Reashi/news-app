import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NewsService, NewsArticle } from '../../services/news';

@Component({
  selector: 'app-search',
  imports: [CommonModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  newsArticles: NewsArticle[] = [];
  currentPage = 1;
  totalResults = 0;
  pageSize = 20;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      if (this.searchQuery) {
        this.searchNews();
      }
    });
  }

  searchNews() {
    if (!this.searchQuery.trim()) return;
    
    this.loading = true;
    this.newsService.searchNews(this.searchQuery, this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.totalResults = response.totalResults;
        this.newsArticles = response.articles;
        this.loading = false;
      },
      error: (error) => {
        console.error('Arama sonuçları yüklenirken hata oluştu:', error);
        this.loading = false;
      }
    });
  }

  changePage(page: number) {
    this.currentPage = page;
    this.searchNews();
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
