import { useRouter } from 'next/router';

function Post(props) {

  const { isFallback } = useRouter();

  if (isFallback) {
    return (<>EMPTY</>);
}

  console.log('Props .', props)
  return <div>Post : {JSON.stringify(props)}</div>
}

export async function getStaticPaths() {

  console.log('Porsts.getStaticPaths.', new Date(), ' - Calling paths.json')


  //let posts = [{id : 'one'}, {id : 'two'}]
  const res = await fetch(`http://localhost:8000/paths.json`)
  const posts = await res.json()
  console.log('Posts.getStaticPaths - Paths', posts)

  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: 'blocking' }  
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  // const res = await fetch(`https://.../posts/${params.id}`)
  // const post = await res.json()
  console.log('Posts.getStaticProps.', new Date(), ' - Calling data.json')
  const res = await fetch(`http://localhost:8000/data.json`)
  const data = await res.json()

  console.log('Posts.getStaticProps - ', params)
  let key = params.id

  // Next.js will attempt to re-generate the page:
  // - When a request comes in
  // - At most once every 10 seconds

  if(data[key]) {
    return { 
      props: { post : data[key] },
      revalidate: 15, // In seconds 
    }
  } else {
    
    return { 
      props: {  },    
      revalidate: 15, // In seconds 
    }
  }

  
}

  
export default Post