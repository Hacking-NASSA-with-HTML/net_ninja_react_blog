import { useState, useEffect } from "react"
import BlogList from "./BlogList"

const Home = () => {
    const [blogs, setBlogs] = useState(null)
    // Loader shown before data appear for rendering
    const [isPending, setIsPending] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            // console.log('Use Effect ran')
            fetch('http://localhost:8000/blogs')
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    // console.log(data)
                    setBlogs(data)
                    setIsPending(false)
                })
        }, 4000);
    }, [])

    return (
        <div className="home">
            {/* Loader shown before data appears for rendering */}
            {isPending && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} title='All Blogs!' />}
        </div>
    )
}

export default Home