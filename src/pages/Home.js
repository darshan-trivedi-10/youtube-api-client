import React, { useState } from 'react'
import Navbar from '../component/Navbar'
import { fetchData } from '../APIS/apis.js'
import VideoCard from '../component/VideoCard';

function Home() {

    const [page, setPage] = useState(1);
    const [videos, setVideos] = useState([]);
    useState(() => {
        const FetchData = async () => {
            const data = await fetchData(page);
            setVideos(data.data.data);
        }
        FetchData();
    }, [page])

    return (
        <div className='Home'>
            <Navbar />
            <div className='w-[100vw] flex flex-wrap justify-center item-center h-auto'>
                {
                    videos.map((videodata) => {
                        return <VideoCard videodata ={videodata} />
                    })
                }


            </div>
        </div>
    )
}

export default Home