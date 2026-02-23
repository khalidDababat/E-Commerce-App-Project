export const getAllNotifications = async () => {
    try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notifications`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 401) {
            localStorage.removeItem('token');
            window.location.href = "/login";
            return [];
        }
        if (!res.ok) {
            return [];
        }
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const markNotificationAsRead = async (id: number) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notifications/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
