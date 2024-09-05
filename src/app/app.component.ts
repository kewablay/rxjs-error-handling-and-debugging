import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product, products } from '../../data';
import {
  catchError,
  delay,
  finalize,
  map,
  of,
  retry,
  switchMap,
  tap,
  throwError,
  timer,
} from 'rxjs';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CurrencyPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  title = 'rxjs-error-handling-and-debugging';
  productList: any[] = [];
  loading: boolean = false;
  error: string | null = null;
  retryCount: number = 0;

  // Simulate HTTP Request
  simulateHttpRequest() {
    this.loading = true;
    this.productList = [];
    this.error = null;
    this.retryCount = 0;

    return timer(2000).pipe(
      switchMap(() => {
        if (Math.random() < 0.72) {
          return throwError(
            () => new Error('Random simulated error occurred!')
          );
        } else {
          // Emit the products array on success
          return of(products);
        }
      }),
      retry({
        count: 2,
        resetOnSuccess: true,
        delay: (error, retryCount) => {
          this.retryCount = retryCount;
          console.log(`Retrying... Attempt #${retryCount}`);
          this.error = `Retrying... Attempt #${retryCount}`;
          return timer(1000); // Wait 1 second before retrying
        },
      }),
      // retry(2), // Retry twice before giving up
      catchError((error) => {
        // Handle error, provide fallback
        console.error('Error occurred:', error);
        this.error = `Failed after ${this.retryCount} attempts`;
        return of([]); // Fallback response as an empty array
      }),
      tap({
        next: (value) => console.log('Data received:', value),
        error: (error) => console.log('Error encountered:', error),
        complete: () => console.log('Request completed'),
      })
    );
  }

  // Method to trigger data fetching
  fetchData() {
    this.simulateHttpRequest().subscribe({
      next: (response) => {
        this.productList = response as any[];
        this.loading = false;
        console.log('Fetched products:', this.productList);
      },
      error: (error) => {
        this.error = 'An error occurred, please try again';
        console.log('Error in main:', this.error);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
