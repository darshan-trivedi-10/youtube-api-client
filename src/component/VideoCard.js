import React from 'react'

function VideoCard({ videodata }) {
    return (
        <>
            <div className="m-6  lg:flex">
                <div className="h-48 lg:h-auto lg:w-48 flex bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center" style={{ backgroundImage: `url(${videodata.thumbnails.high.url})` }}></div>
                <div className="w-[600px] border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div className="flex items-center">
                        <div className="text-sm">
                            <p>Title: {videodata.title}</p>
                            <br />
                            <p className='break-all '>Description: {videodata.description}
                            </p>
                            <br />
                            <p>ChannelTitle: {videodata.channelTitle}</p>
                            <br />
                            <p>publishedAt: {new Date(videodata.publishTime).toLocaleString()}</p>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
            <br />
        </>
    )
}

export default VideoCard;