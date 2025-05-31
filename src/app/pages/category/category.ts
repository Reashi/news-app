import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsService, NewsArticle } from '../../services/news';

@Component({
  selector: 'app-category',
  imports: [CommonModule, FormsModule],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class CategoryComponent implements OnInit {
  categoryName: string = '';
  newsArticles: NewsArticle[] = [];
  currentPage = 1;
  totalResults = 0;
  pageSize = 20;
  loading = false;
  
  // Filter options
  sortBy = 'publishedAt';
  sortOrder = 'desc';
  dateFilter = '';

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryName = params['name'];
      this.loadCategoryNews();
    });
  }

  loadCategoryNews() {
    this.loading = true;
    this.newsService.getTopHeadlinesByCategory(this.categoryName, 'us', this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.totalResults = response.totalResults;
        this.newsArticles = this.applySorting(response.articles);
        this.loading = false;
      },
      error: (error) => {
        console.error('Kategori haberleri yüklenirken hata oluştu:', error);
        this.loading = false;
      }
    });
  }

  applySorting(articles: NewsArticle[]): NewsArticle[] {
    let sortedArticles = [...articles];
    
    if (this.sortBy === 'publishedAt') {
      sortedArticles.sort((a, b) => {
        const dateA = new Date(a.publishedAt).getTime();
        const dateB = new Date(b.publishedAt).getTime();
        return this.sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      });
    } else if (this.sortBy === 'title') {
      sortedArticles.sort((a, b) => {
        const comparison = a.title.localeCompare(b.title);
        return this.sortOrder === 'desc' ? -comparison : comparison;
      });
    }

    // Date filter
    if (this.dateFilter) {
      const filterDate = new Date(this.dateFilter);
      sortedArticles = sortedArticles.filter(article => {
        const articleDate = new Date(article.publishedAt);
        return articleDate >= filterDate;
      });
    }

    return sortedArticles;
  }

  onFilterChange() {
    this.newsArticles = this.applySorting(this.newsArticles);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.loadCategoryNews();
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

  get categoryDisplayName(): string {
    const categoryNames: { [key: string]: string } = {
      'business': 'İş Dünyası',
      'entertainment': 'Eğlence',
      'general': 'Genel',
      'health': 'Sağlık',
      'science': 'Bilim',
      'sports': 'Spor',
      'technology': 'Teknoloji'
    };
    return categoryNames[this.categoryName] || this.categoryName;
  }

  openArticle(url: string) {
    window.open(url, '_blank');
  }

  onImageError(event: any) {
    event.target.style.display = 'none';
    event.target.parentElement.classList.add('no-image');
  }
}
