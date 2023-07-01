import React from "react";

export default function Navbar(props) {
    const { setVideos, setPage, setRefresh,refresh,  sortOrder, handleSort, stopFetching } = props;

    return (
        <div className="flex navbar text-white bg-gray-800 items-center justify-center w-[100vw] h-[12vh]">
            <h2 className="text-white text-2xl mr-6 ">
                Youtube API Data Dashboard
            </h2>
            <button
                onClick={() => {
                    setVideos([]);
                    setPage(1);
                    setRefresh(!refresh);
                }}
                className="border-2 border-grey rounded-2xl w-24 sm:w-32 h-12 sm:h-12 mr-4 sm:mr-8  border-gray-600 border-3"
            >
                Refresh Button
            </button>
            <button
                onClick={handleSort}
                className="border-2 border-grey rounded-2xl w-24 sm:w-32 h-12 sm:h-12 mr-4 sm:mr-8  border-gray-600 border-3"
            >
                Sort by Date
                {sortOrder === 'asc' ? ' Ascending' : ' Descending'}
            </button>

            <button
                onClick={stopFetching}
                className="border-2 border-grey rounded-2xl w-24 sm:w-32 h-12 sm:h-12 mr-4 sm:mr-8  border-gray-600 border-3"
            >
                Stop Fetching Videos
            </button>
        </div>
    );
}
