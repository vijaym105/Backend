import { getFeed } from "../services/post.api";
import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";

export const usePost = () => {

    const context = useContext(PostContext);

    const {
        loading,
        setloading,
        feed,
        setfeed,
        post,
        setpost
    } = context;

    const getDetsHandler = async () => {

        try {

            setloading(true);

            const data = await getFeed();
            console.log(data)
            setfeed(data.note);

        } catch (error) {

            console.log(error);

        } finally {

            setloading(false);
        }
    };

  

    return {
        loading,
        feed,
        post,
        setpost,
        getDetsHandler
    };
};