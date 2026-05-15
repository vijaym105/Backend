import React, { useEffect } from 'react'
import '../style/feed.scss'
import Post from '../component/Post'
import { usePost } from '../hooks/usePost'

const Feed = () => {

    const { feed, loading, getDetsHandler } = usePost()

      useEffect(() => {
        getDetsHandler();
    }, []);

    console.log(feed)
    if (!feed || loading) {
        return <main><h1>Loading...</h1></main>
    }
    console.log(feed)
    return (
        <main className='feed-page'>
            <div className='feed'>
                <div className="posts">
                    {feed.map(post => {
                       return <Post
                            key={post._id}
                            user={post.user}
                            caption={post.caption}
                            image={post.imgFile}
                        />
                    })}

                </div>
            </div>
        </main>
    )
}

export default Feed