import { useEffect, useState } from 'react';
import PersonForm from './PersonForm';
import Persons from './Persons';
import {
    create as createPerson,
    getAll as getAllPersons,
    update as updatePerson,
    remove as removePerson,
} from './services/persons';
import Notificaton, { NotificationState } from './Notification';
import { AxiosError } from 'axios';

export interface Person {
    id?: number;
    name: string;
    number: string;
}

const NOTIF_NONE: NotificationState = {
    message: null,
    kind: 'error',
};

function App() {
    const [persons, setPersons] = useState<Person[]>([]);
    const [forceRefresh, setForceRefresh] = useState(0);
    const [notifState, setNotifState] = useState<NotificationState>(NOTIF_NONE);

    const [notifTimeoutHandle, setNotifTimeoutHandle] = useState<null | number>(
        null,
    );

    useEffect(() => {
        getAllPersons().then((persons) => setPersons(persons));
    }, [forceRefresh]);

    // with duration = 0 it stays until the next notification
    function notify(state: NotificationState, duration: number = 10000) {
        if (notifTimeoutHandle) clearInterval(notifTimeoutHandle);

        setNotifState(state);
        if (duration > 0)
            setNotifTimeoutHandle(
                setTimeout(() => setNotifState(NOTIF_NONE), duration),
            );
    }

    function errorHandler(err: AxiosError) {
        if (!err.response) return;
        if (err.status !== 400) {
            console.error(err);
            return;
        }

        notify(
            {
                message: (err.response.data as any).error,
                kind: 'error',
            },
            0,
        );
    }

    return (
        <div>
            <Notificaton state={notifState} />
            <h2>Phonebook</h2>
            <PersonForm
                persons={persons}
                onNewPerson={(person) => {
                    createPerson(person)
                        .then((createdPerson: Person) => {
                            setPersons((old) => {
                                const copy = [...old];
                                copy.push(createdPerson);
                                return copy;
                            });

                            notify({
                                message: `Added ${createdPerson.name}`,
                                kind: 'success',
                            });
                        })
                        .catch((err) => errorHandler(err));
                }}
                onUpdateNumber={(number, person) => {
                    updatePerson(person.id!, {
                        name: person.name,
                        number,
                    })
                        .then(() => {
                            notify({
                                message: `Updated ${person.name}`,
                                kind: 'success',
                            });
                        })
                        .catch((err) => errorHandler(err))
                        .finally(() => setForceRefresh((old) => old + 1));
                }}
            />

            <h2>Numbers</h2>
            <Persons
                persons={persons}
                onPersonDelete={(id) => {
                    removePerson(id)
                        .then((removedPerson: Person) => {
                            setForceRefresh((old) => old + 1);
                            console.log(removedPerson);
                            notify({
                                message: `Removed ${removedPerson.name}`,
                                kind: 'success',
                            });
                        })
                        .catch((err) => errorHandler(err));
                }}
            />
        </div>
    );
}

export default App;
