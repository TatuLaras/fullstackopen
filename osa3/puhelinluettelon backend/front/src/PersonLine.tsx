import { Person } from './App';

interface Props {
    person: Person;
    onPersonDelete: (id: number) => void;
}

export default function PersonLine({ person, onPersonDelete }: Props) {
    return (
        <p>
            {person.name} {person.number}
            <button
                onClick={() => {
                    if (
                        person.id &&
                        confirm(`Do you really want to remove ${person.name}?`)
                    ) {
                        onPersonDelete(person.id);
                    }
                }}
            >
                delete
            </button>
        </p>
    );
}
