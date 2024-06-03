import React from 'react'
import service from "../appwrite/configurations"
import {Link} from 'react-router-dom'

function PostCard({$id, title, imageurl}) {
    console.log('om');
    console.log('$id', $id);
    console.log('imageurl', imageurl)
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={service.getFilePreview(imageurl)} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard