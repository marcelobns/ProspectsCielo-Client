import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MCCodesService {

    private baseUrl = 'http://localhost:8080/v1/mc-codes';

    list(search_term: String = ''): Observable<any> {
        const search = search_term ? `?search_term=${search_term}` : '';
        const endpoint = `${this.baseUrl}${search}`;

        return new Observable((subscriber) => {
            fetch(endpoint)
                .then(response => (response || {}).json())
                .then(data => subscriber.next(data))
                .catch(error => subscriber.error(error));
        });
    }
}
