import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import { fetchData, searchVideo, startFetchingVideos, stopFetchingVideos, addKey, getAllKeys } from '../APIS/apis.js';
import VideoCard from '../component/VideoCard';

function Home() {
    const [page, setPage] = useState(1);
    const [videos, setVideos] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [refresh, setRefresh] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [tag, setTag] = useState('');
    const [isFetchingStart, setIsFetchingStart] = useState(false);
    const [key, setKey] = useState('');
    const [keysdata, setKeysdata] = useState([]);


    useEffect(() => {
        const fetchDataAsync = async () => {
            const data = await fetchData(page);
            setVideos((prevVideos) => [...prevVideos, ...data.data.data]);
        };

        fetchDataAsync();
    }, [page, refresh]);

    useEffect(() => {
        const fetchAllKeys = async () => {
            const data = await getAllKeys();
            setKeysdata(data?.data?.data);
        }
        fetchAllKeys();
    }, [])

    const handleSort = () => {
        const sortedVideos = [...videos].sort((a, b) => {
            const dateA = new Date(a.publishedAt);
            const dateB = new Date(b.publishedAt);
            if (sortOrder === 'asc') {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });
        setVideos(sortedVideos);
        setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    };

    const handleSearch = async () => {
        const data = await searchVideo(searchKeyword);
        setVideos(data.data.data);
    };

    const stopFetching = async () => {
        let response = await stopFetchingVideos();
        if (response.data.success === true) {
            alert("Video Fetching Stoped SuccesFully :) ");
            setIsFetchingStart(false);
        }
    }

    const handleTag = async (tag) => {

        if (!keysdata || keysdata.length === 0) {
            alert("Please Add Your API Key First")
            return;
        }
        if (isFetchingStart === true) {
            alert("Please First Stop Current Fetching Process :)");
            return;
        }

        let response = await startFetchingVideos({
            "keyword": tag
        });
        if (response.data.success === true) {
            alert("Video Fetching Start");
            setIsFetchingStart(true);
        }
    };

    const addNewKey = async () => {
        if (key === ' ' || !key) {
            alert('Please Add Key');
            return;
        }
        let data = await addKey({
            "key": key
        });
        if (data.data.success === true) {
            alert("Key Added Succesfully");
            setKeysdata([...keysdata, key]);

        }
        setKey('');
    }

    return (
        <div className="Home">

            <Navbar setVideos={setVideos} setPage={setPage} setRefresh={setRefresh} refresh={refresh} sortOrder={sortOrder} handleSort={handleSort} stopFetching={stopFetching} />

            <div className="mb-10 w-screen flex item-center flex-wrap justify-center">
                <section className="mt-8 m-4 h-12">
                    <input
                        placeholder="Search Video By Keyword"
                        className="border-2 border-grey rounded-2xl text-center text-black-800 rounded-md border-gray-600 border-3"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                </section>
                <button
                    onClick={handleSearch}
                    className="border-2 mt-6 border-grey rounded-2xl w-24 sm:w-32 h-12 sm:h-12 mr-4 sm:mr-8  border-gray-600 border-3"
                >
                    Search Video By Keyword
                </button>
            </div>

            <div className="mb-10 w-screen flex item-center flex-wrap justify-center">
                <section className="m-3 h-12">
                    <input
                        placeholder="Add New Key Here"
                        className="border-2 border-grey rounded-2xl text-center text-black-800 rounded-md border-gray-600 border-3"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                    />
                </section>
                <button onClick={addNewKey} className="border-2  border-grey rounded-2xl w-24 sm:w-32 h-12 sm:h-12 mr-4 sm:mr-8  border-gray-600 border-3">
                    Add New Key
                </button>

                <section className="m-3 h-12">
                    <input
                        placeholder="Add Tag Here"
                        className="border-2 border-grey rounded-2xl text-center text-black-800 rounded-md border-gray-600 border-3"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                    />
                </section>
                <button
                    className="border-2 border-grey rounded-2xl w-24 sm:w-32 h-12 sm:h-12 mr-4 sm:mr-8  border-gray-600 border-3"
                    onClick={() => handleTag(tag)}
                >
                    Fetch Video of this Tag
                </button>

            </div>

            <div className="mb-10 w-full flex flex-col items-center justify-center">
                <div >All Keys : </div>
                {
                    keysdata.map((keyData) => {
                        return <pre>{keyData}</pre>
                    })
                }
            </div>

            <div className="w-[100vw] flex flex-wrap justify-center item-center h-auto">
                {videos.map((videoData) => (
                    <VideoCard videodata={videoData} key={videoData.id} />
                ))}
            </div>

            <div className="mb-10 w-screen flex item-center justify-center">
                <button
                    onClick={() => setPage((prevPage) => prevPage + 1)}
                    className="border-2 mt-6 border-grey rounded-2xl w-24 sm:w-32 h-12 sm:h-12 mr-4 sm:mr-8  border-gray-600 border-3"
                >
                    Fetch More Videos
                </button>
            </div>
        </div>
    );
}

export default Home;
