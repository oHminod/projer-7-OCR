const localeDateFromDate = (dateString) => {
    return (
        "le " +
        new Date(dateString).toLocaleDateString([], {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        }) +
        " à " +
        new Date(dateString).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })
    );
};
export default localeDateFromDate;
