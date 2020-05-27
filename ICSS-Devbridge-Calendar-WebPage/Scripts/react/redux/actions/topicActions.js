import { FETCH_TOPICS } from "./types";
import { baseApiUrl } from "../config";
import axios from "axios";


export const fetchTopics = (accessToken) => dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    }

    return axios.get(baseApiUrl + `/api/topics`, config)
        .then(topicsResponse => {
            const topics = topicsResponse.data;
            dispatch({
                type: FETCH_TOPICS,
                payload: topics
            })
        });
}

export const createTopic = (accessToken, topicData) => dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    }

    const data = {
        Name: topicData.name,
        Description: topicData.description,
        ParentTopicId: topicData.parentTopic
    }

    return axios.post(baseApiUrl + `/api/topics`, data, config);
}