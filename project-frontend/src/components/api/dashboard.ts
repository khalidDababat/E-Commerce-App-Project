import { toast } from 'react-toastify';

export interface DashboardData {
    products_count: number;
    orders_count: number;
    features_count: number;
}

export const getDashboardData = async (): Promise<
    DashboardData | undefined
> => {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/get-all-states`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );
        if (!res.ok) {
            console.log('Failed to fetch data');
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};
