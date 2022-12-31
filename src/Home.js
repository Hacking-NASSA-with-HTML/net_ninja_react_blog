import { useState, useEffect } from "react"
import BlogList from "./BlogList"

const Home = () => {
    const [blogs, setBlogs] = useState(null)
    // Loader shown before data appear for rendering
    const [isPending, setIsPending] = useState(true)
    const [err, setErr] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            // console.log('Use Effect ran')
            fetch('http://localhost:8000/blogs')
                .then(res => {
                    // console.log(res)
                    if (!res.ok) {
                        throw Error('Could not  fetch the data for that resource!')
                    }
                    return res.json()
                })
                .then(data => {
                    // console.log(data)
                    setBlogs(data)
                    setIsPending(false)
                    setErr(null)
                })
                .catch(error => {
                    // console.log(error.message)
                    setErr(error.message)
                    setIsPending(false)
                })
        }, 4000);
    }, [])

    return (
        <div className="home">
            {/* Loader shown before data appears for rendering */}
            {err && <div>{err}</div>}
            {isPending && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} title='All Blogs!' />}
        </div>
    )
}

export default Home