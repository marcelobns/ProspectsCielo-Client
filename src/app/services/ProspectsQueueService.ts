import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProspectsQueue } from '../interfaces/IProspectsQueue';

@Injectable({
    providedIn: 'root'
})
export class ProspectsQueueService {

    private baseUrl = 'localhost:8080/v1/prospects-queue';

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

    add(newObject: IProspectsQueue): Observable<any> {
        const endpoint = `${this.baseUrl}/add`;

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newObject),
        };

        return new Observable((subscriber) => {
            fetch(endpoint, requestOptions)
                .then(response => response.json())
                .then(data => subscriber.next(data))
                .catch(error => subscriber.error(error));
        });
    }

    next(): Observable<any> {
        const endpoint = `${this.baseUrl}/next`;

        return new Observable((subscriber) => {
            fetch(endpoint)
                .then(response => response.json())
                .then(data => subscriber.next(data))
                .catch(error => subscriber.error(error));
        });
    }

    remove(): Observable<any> {
        const endpoint = `${this.baseUrl}/remove`;
        
        const requestOptions: RequestInit = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        return new Observable((subscriber) => {
            fetch(endpoint, requestOptions)
                .then(response => response)
                .then(data => subscriber.next(data))
                .catch(error => subscriber.error(error));
        });
    }
}
