import { useState } from 'react';
import { Person } from './App';

interface Props {
    persons: Person[];
    onNewPerson: (person: Person) => void;
    onUpdateNumber: (number: string, person: Person) => void;
}

export default function PersonForm({
    persons,
    onNewPerson,
    onUpdateNumber,
}: Props) {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                const name = newName.trim();
                const number = newNumber.trim();

                for (let person of persons) {
                    if (person.name !== name) continue;

                    // Person with the same name found

                    if (
                        person.id &&
                        confirm(
                            `${name} is already in the phonebook. Update number?`,
                        )
                    ) {
                        onUpdateNumber(number, person);

                        setNewName('');
                        setNewNumber('');
                    }

                    return;
                }

                onNewPerson({ name, number });

                setNewName('');
                setNewNumber('');
            }}
        >
            <div>
                name:{' '}
                <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
            </div>
            <div>
                number:{' '}
                <input
                    value={newNumber}
                    onChange={(e) => setNewNumber(e.target.value)}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
}
