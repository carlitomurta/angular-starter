import { Logger } from 'app/core/logger.service';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';

const log = new Logger('Preloading Strategy');

export function shouldPreload(route: Route): boolean {
  // Get NetworkInformation object
  const conn = navigator['connection'] || navigator['mozConnection'] || navigator['webkitConnection'];
  log.debug(conn);
  if (conn) {
    // Save-Data mode
    if (conn.saveData) {
      return false;
    }
    // 'slow-2g', '2g', '3g', or '4g'
    const effectiveType = conn.effectiveType || '';
    // 2G network
    if (effectiveType.includes('2g')) {
      return false;
    }
  }
  return true;
}

@Injectable({ providedIn: 'root' })
export class NetworkAwarePreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (shouldPreload(route)) {
      return load();
    } else {
      return EMPTY;
    }
  }
}
