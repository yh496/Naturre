
import axios from 'axios'
import {useRouter} from 'next/router'

function WPPostDetail ({post}) {
    const router = useRouter()
    if (router.isFallback) {
        return <div>Loading...</div>
      }

      return (
        <div dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>



      )


}


export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const response = await axios.get( 'http://bbonggucom.local//wp-json/wp/v2/posts')
  
    // Get the paths we want to pre-render based on posts
    const paths = response.data.map(post => `/blog/${post.id}`)
  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const res = await axios.get(`http://bbonggucom.local//wp-json/wp/v2/posts/${params.id}`)
    const post = res.data
    // Pass post data to the page via props
    return { props: { post } }
  }
  

  export default WPPostDetail
  