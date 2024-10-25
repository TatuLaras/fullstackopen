import { useState } from 'react';
import { Person } from './App';
import Filter from './Filter';
import PersonLine from './PersonLine';

interface Props {
    persons: Person[];
    onPersonDelete: (id: number) => void;
}

export default function Persons({ persons, onPersonDelete }: Props) {
    const [filter, setFilter] = useState('');

    return (
        <>
            <Filter filter={filter} setFilter={setFilter} />
            {persons
                .filter((person) =>
                    person.name.toLowerCase().includes(filter.toLowerCase()),
                )
                .map((person) => (
                    <PersonLine
                        key={person.name}
                        person={person}
                        onPersonDelete={onPersonDelete}
                    />
                ))}
        </>
    );
}
