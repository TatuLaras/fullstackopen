import { useEffect, useState } from 'react';
import Filter from './Filter';
import CountryInfo from './CountryInfo';

function App() {
    const [data, setData] = useState<object[]>([]);
    const [filter, setFilter] = useState('');
    const [filteredData, setFilteredData] = useState<object[]>([]);

    useEffect(() => {
        fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then((t) => t.json())
            .then((res) => setData(res));
    }, []);

    useEffect(() => {
        setFilteredData(
            data.filter((item: any) =>
                item.name.common.toLowerCase().includes(filter.toLowerCase()),
            ),
        );
    }, [filter]);

    return (
        <>
            <Filter filter={filter} setFilter={setFilter} />

            {filteredData.length > 10 && (
                <p>Too many matches, narrow down your search.</p>
            )}

            {filteredData.length <= 10 &&
                filteredData.length > 1 &&
                filteredData.map((item: any) => (
                    <p key={item.name.common}>
                        {item.name.common}{' '}
                        <button onClick={() => setFilter(item.name.common)}>
                            show
                        </button>
                    </p>
                ))}

            {filteredData.length === 1 && (
                <CountryInfo country={filteredData[0]} />
            )}

            {filteredData.length === 0 && <p>No matches.</p>}
        </>
    );
}

export default App;
