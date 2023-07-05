import { useQuery } from '@tanstack/react-query';
import { fetchAPI } from 'api/api';
import { queryKeyDetail } from 'api/queryKeys/queryKeys';

const DEFAULT_STALE_TIME = 10 * 60 * 1000; // 10min

export const fetchAbout = async () => {
    return await fetchAPI("/about", {populate: [
        "*",
        "siteSeo",
        "siteSeo.shareImage",
        "video",
        "video.videoThumbnail",
    ]})
}

export const useFetchAbout = () => {
    return useQuery(queryKeyDetail("/about"), () => fetchAbout(),{
        staleTime: DEFAULT_STALE_TIME
    })
}