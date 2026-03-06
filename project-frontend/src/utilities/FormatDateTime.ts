export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-EG');
};

export const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-EG', {
        hour: '2-digit',
        minute: '2-digit',
    });
};
