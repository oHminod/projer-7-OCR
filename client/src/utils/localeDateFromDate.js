const localeDateFromDate = (dateString) => {
    return (
        "le " +
        new Date(dateString).toLocaleDateString([], {
            year: "numeric",
            month: "long",
            day: "numeric",
        }) +
        " à " +
        new Date(dateString)
            .toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })
            .split(":")
            .join("h")
    );
};
export default localeDateFromDate;
