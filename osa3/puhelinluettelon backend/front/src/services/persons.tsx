import axios from 'axios';
import { Person } from '../App';
const baseUrl = '/api/persons';

export async function getAll() {
    const request = await axios.get(baseUrl);
    return request.data;
}

export async function create(person: Person) {
    const request = await axios.post(baseUrl, person);
    return request.data;
}

export async function update(id: number, obj: object) {
    const request = await axios.put(`${baseUrl}/${id}`, obj);
    return request.data;
}

export async function remove(id: number) {
    const request = await axios.delete(`${baseUrl}/${id}`);
    return request.data;
}
