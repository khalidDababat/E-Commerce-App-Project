

export const formatDate = (dateString: string) => {


    return new Date().toLocaleDateString('en-EG', {
        timeZone: 'Asia/Hebron',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });


};

export const formatTime = (dateString: string) => {
    return new Date().toLocaleTimeString('en-EG', {
        timeZone: 'Asia/Hebron',
        hour: '2-digit',
        minute: '2-digit',
    });


};
