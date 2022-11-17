import useMyOldestPostFetch from "../../hooks/useMyOldestPostFetch";
import useOldestPostFetch from "../../hooks/useOldestPostFetch";

const SetOldestsPosts = () => {
    useMyOldestPostFetch();
    useOldestPostFetch();
};

export default SetOldestsPosts;
