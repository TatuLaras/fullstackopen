import { Dispatch, SetStateAction } from 'react';

interface Props {
    filter: string;
    setFilter: Dispatch<SetStateAction<string>>;
}

export default function Filter({ filter, setFilter }: Props) {
    return (
        <>
            find countries{' '}
            <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
        </>
    );
}
