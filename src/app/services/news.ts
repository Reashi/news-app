import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NewsArticle {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiKey = '773f6873e8d740b1b4f84d9ecdf01494'; 
  private baseUrl = 'https://newsapi.org/v2';

  constructor(private http: HttpClient) { }

  getTopHeadlines(country: string = 'us', page: number = 1, pageSize: number = 20): Observable<NewsResponse> {
    const url = `${this.baseUrl}/top-headlines?country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${this.apiKey}`;
    return this.http.get<NewsResponse>(url);
  }

  getTopHeadlinesByCategory(category: string, country: string = 'us', page: number = 1, pageSize: number = 20): Observable<NewsResponse> {
    const url = `${this.baseUrl}/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${this.apiKey}`;
    return this.http.get<NewsResponse>(url);
  }

  searchNews(query: string, page: number = 1, pageSize: number = 20): Observable<NewsResponse> {
    const url = `${this.baseUrl}/everything?q=${query}&page=${page}&pageSize=${pageSize}&apiKey=${this.apiKey}`;
    return this.http.get<NewsResponse>(url);
  }
}
