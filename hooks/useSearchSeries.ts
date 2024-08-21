import { useState, useEffect } from 'react';

const useSearchSeries = (initialText = '') => {
    const [searchText, setSearchText] = useState(initialText);
    const [data, setData] = useState(null);

    useEffect(() => {
        let mounted = true;

        if (searchText) {
            const fetchData = async () => {
                try {
                    const res = await fetch(`/api/search?text=${searchText}`);
                    if (!res.ok) {
                        console.error('Error fetching data:', res.statusText);
                        setData(null); // Reset data to null on error
                    } else {
                        const searchData = await res.json();
                        if (mounted) {
                            setData(searchData.length > 0 ? searchData : null);
                        }
                    }
                } catch (error) {
                    console.error('Fetch error:', error);
                    setData(null); // Reset data to null on error
                }
            };

            fetchData();
        } else {
            setData(null); // Reset data to null when searchText is empty
        }

        return () => {
            mounted = false;
        };
    }, [searchText]);

    return { searchText, setSearchText, data };
};

export default useSearchSeries;
