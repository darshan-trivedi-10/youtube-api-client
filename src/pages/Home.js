import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import { fetchData, searchVideo, stopFetchingVideos } from '../APIS/apis.js';
import VideoCard from '../component/VideoCard';

function Home() {
    const [page, setPage] = useState(1);
    const [videos, setVideos] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [refresh, setRefresh] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        const fetchDataAsync = async () => {
            const data = await fetchData(page);
            console.log("PAGE: ", page);
            console.log(data);
            setVideos((prevVideos) => [...prevVideos, ...data.data.data]);
        };

        fetchDataAsync();
    }, [page, refresh]);

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
        console.log(data);
        setVideos(data.data.data);
    };

    const stopFetching = async () => {
        let response = await stopFetchingVideos();
        if (response.data.success === true) {
            alert("Video Fetching Stoped SuccesFully :) ");
        }
    }

    return (
        <div className="Home">

            {/* const {setVideos, setPage, setRefresh, refresh, sortOrder, handleSort, stopFetching} = props; */}

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
                <section className="mt-8 m-4 h-12">
                    <input
                        placeholder="Add New Key Here"
                        className="border-2 border-grey rounded-2xl text-center text-black-800 rounded-md border-gray-600 border-3"
                    />
                </section>
                <button className="border-2 mt-6 border-grey rounded-2xl w-24 sm:w-32 h-12 sm:h-12 mr-4 sm:mr-8  border-gray-600 border-3">
                    Add New Key
                </button>
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
