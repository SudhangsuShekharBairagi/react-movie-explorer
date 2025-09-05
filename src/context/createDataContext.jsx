import React, { createContext, useContext, useState, useEffect } from "react";

export function createDataContext(fetchFn) {
    const DataContext = createContext();

    // Define normally (not exported here)
    function DataProvider({ children }) {
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
            let isMounted = true;
            setLoading(true);
            setError(null);

            fetchFn()
                .then(res => {
                    if (!res.ok) throw new Error("Failed to fetch");
                    return res.json();
                })
                .then(json => {
                    if (isMounted) {
                        if (!json.results || json.results.length === 0) {
                            setData([]);
                            setError("Not Found")

                        } else {
                            setData(json.results);
                        }
                    };
                })
                .catch(err => {
                    if (isMounted) setError(err.message);
                })
                .finally(() => {
                    if (isMounted) setLoading(false);
                });

            return () => { isMounted = false };
        }, []);

        return (
            <DataContext.Provider value={{ data, loading, error }}>
                {children}
            </DataContext.Provider>
        );
    }

    // Hook for consumers
    function useData() {
        return useContext(DataContext);
    }

    // Return both
    return [DataProvider, useData];
}
