import React, { useEffect } from 'react'
import '../style/feed.scss'
import Post from '../component/Post'
import { usePost } from '../hooks/usePost'
import Nav from '../component/Nav'

const Feed = () => {

    const { feed, loading, getDetsHandler , likeHandler, unLikeHandler } = usePost()

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
                 <Nav />
                <div className="posts">
                    {feed.map(post => {
                       return <Post user={post.user} post={post} liked={likeHandler} unliked={unLikeHandler} loading={loading}/>
                    })}

                </div>
            </div>
        </main>
    )
}

export default Feed