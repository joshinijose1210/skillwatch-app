import { useEffect, useMemo, useState } from 'react';
import { FILTER_OPTIONS, TUTORIALS_DATA } from './constants';

const API_KEY = process.env.YOUTUBE_API_KEY;

async function getYoutubeViewCount(videoId: string) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${API_KEY}`);
    const data = await response.json();
    const viewCount = data.items[0]?.statistics?.viewCount;
    return viewCount;
}

export const useTutorial = (videoId?: string) => {
    const [filter, setFilter] = useState<string>('all');
    const [searchText, setSearchText] = useState<string>('');
    const [viewCount, setViewCount] = useState<number>(0);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const toggleModal = () => setOpenModal(prev => !prev);

    const onSearchChange = (text: string) => setSearchText(text.toLowerCase());

    const onSearchClear = () => setSearchText('');

    useEffect(() => {
        if (!videoId) return;
        (async () => {
            try {
                const views = await getYoutubeViewCount(videoId);
                setViewCount(views);
            } catch (error) {
                console.error('Error fetching view count:', error);
            }
        })();
    }, [videoId]);

    const filteredTutorials = useMemo(() => {
        return TUTORIALS_DATA.filter(tutorial => {
            const matchesFilter = filter === 'all' || tutorial.category === FILTER_OPTIONS.find(opt => opt.value === filter)?.label;

            const matchesSearch =
                tutorial.cardLabel.toLowerCase().includes(searchText) ||
                tutorial.cardDescription.toLowerCase().includes(searchText) ||
                tutorial.cardTag.some(tag => tag.toLowerCase().includes(searchText)) ||
                tutorial.category.toLowerCase().includes(searchText);
            return matchesFilter && matchesSearch;
        });
    }, [searchText, filter]);

    return {
        searchText,
        viewCount,
        filter,
        onSearchChange,
        onSearchClear,
        setFilter,
        openModal,
        toggleModal,
        filteredTutorials
    };
};
