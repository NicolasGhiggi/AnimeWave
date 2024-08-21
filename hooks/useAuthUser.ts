import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { User } from "@/interfaces/User";

const useAuthUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = () => {
            try {
                const serializedUserData = Cookies.get('user_data');

                if (serializedUserData) {
                    try {
                        const parsedUserData = JSON.parse(serializedUserData);

                        if (parsedUserData && typeof parsedUserData === 'object') {
                            setUser(parsedUserData as User);
                        } else {
                            setUser(null);
                            setError('Invalid user data format.');
                        }
                    } catch (parseError) {
                        console.error('Error parsing user data from cookie:', parseError);
                        setUser(null);
                        setError('Error parsing user data.');
                    }
                } else {
                    setUser(null);
                    setError('No user data found in cookies.');
                }
            } catch (fetchError) {
                console.error('Error retrieving user data from cookies:', fetchError);
                setError('Error retrieving user data.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return { user, loading, error };
};

export default useAuthUser;
