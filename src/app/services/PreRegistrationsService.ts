import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPreRegistration } from '../interfaces/IPreRegistration';

@Injectable({
    providedIn: 'root'
})
export class PreRegistrationsService {

    private baseUrl = 'http://localhost:8080/v1/pre-registrations';

    list(search_term: String = '', order_by = 'id desc'): Observable<any> {
        const search = search_term ? `search_term=${search_term}` : 'search_term=%';
        const order = order_by ? `order_by=${order_by}` : 'order_by=id desc';
        const params = [search, order].join('&');
        const endpoint = `${this.baseUrl}?${params}`;
        console.log(endpoint);
        
        
        return new Observable((subscriber) => {
            fetch(endpoint)
                .then(response => (response || {}).json())
                .then(data => subscriber.next(data))
                .catch(error => subscriber.error(error));
        });
    }

    add(newObject: IPreRegistration): Observable<any> {
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

    edit(id: number, newObject: IPreRegistration): Observable<any> {
        const endpoint = `${this.baseUrl}/edit/${id}`;

        const requestOptions: RequestInit = {
            method: 'PUT',
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

    remove(id: number): Observable<any> {
        const endpoint = `${this.baseUrl}/remove/${id}`;
        
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

    show(id: number): Observable<any> {
        const endpoint = `${this.baseUrl}/show/${id}`;

        return new Observable((subscriber) => {
            fetch(endpoint)
                .then(response => response.json())
                .then(data => subscriber.next(data))
                .catch(error => subscriber.error(error));
        });
    }
}
