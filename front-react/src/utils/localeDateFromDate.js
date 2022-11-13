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
export const shortDateFromDate = (dateString) => {
    const timestamp = Date.now();
    const dateStringTimeStamp = new Date(dateString).getTime();
    const dateOffsetInSeconds = Math.floor(
        (timestamp - dateStringTimeStamp) / 1000
    );

    if (dateOffsetInSeconds < 15) {
        return "À l'instant";
    } else if (dateOffsetInSeconds >= 15 && dateOffsetInSeconds < 60) {
        return "Il y a " + dateOffsetInSeconds + " secondes";
    } else if (dateOffsetInSeconds >= 60 && dateOffsetInSeconds < 120) {
        return "Il y a " + Math.floor(dateOffsetInSeconds / 60) + " minute";
    } else if (dateOffsetInSeconds >= 120 && dateOffsetInSeconds < 3600) {
        return "Il y a " + Math.floor(dateOffsetInSeconds / 60) + " minutes";
    } else if (dateOffsetInSeconds >= 3600 && dateOffsetInSeconds < 7200) {
        return "Il y a " + Math.floor(dateOffsetInSeconds / 3600) + " heure";
    } else if (dateOffsetInSeconds >= 7200 && dateOffsetInSeconds < 86400) {
        return "Il y a " + Math.floor(dateOffsetInSeconds / 3600) + " heures";
    } else if (dateOffsetInSeconds >= 86400 && dateOffsetInSeconds < 172800) {
        return "Il y a " + Math.floor(dateOffsetInSeconds / 86400) + " jour";
    } else if (dateOffsetInSeconds >= 172800 && dateOffsetInSeconds < 604800) {
        return "Il y a " + Math.floor(dateOffsetInSeconds / 86400) + " jours";
    } else if (dateOffsetInSeconds >= 604800 && dateOffsetInSeconds < 1209600) {
        return (
            "Il y a " + Math.floor(dateOffsetInSeconds / 604800) + " semaine"
        );
    } else if (
        dateOffsetInSeconds >= 1209600 &&
        dateOffsetInSeconds < 2419200
    ) {
        return (
            "Il y a " + Math.floor(dateOffsetInSeconds / 604800) + " semaines"
        );
    } else {
        return (
            new Date(dateString).toLocaleDateString([], {
                year: "numeric",
                month: "numeric",
                day: "numeric",
            }) +
            ", " +
            new Date(dateString)
                .toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                })
                .split(":")
                .join("h")
        );
    }
};
export default localeDateFromDate;
