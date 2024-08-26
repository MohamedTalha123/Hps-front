// filter.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterSubject = new BehaviorSubject<{type: string, value: any} | null>(null);
  currentFilter$ = this.filterSubject.asObservable();

  setFilter(filter: {type: string, value: any}) {
    this.filterSubject.next(filter);
  }

  clearFilter() {
    this.filterSubject.next(null);
  }
}
