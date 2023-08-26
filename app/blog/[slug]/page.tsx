export const dynamic = "force-dynamic"; // caching -> always fetching latest dynamic
// export const revalidate = 420;  // if we know data is only updated occasionally, update the cache every 'n' amount of seconds


interface Post {
    title: string;
    content: string;
    slug: string;
}

interface Props {
    params: { slug: string }
}

export async function generateStaticParams() { 
    // content doesn't change very often, statically generate those pages in advance, 
    // allowing to be cached on a CDN for extremely fast page loads
    // how to generate all dynamic pages - but there might be 10,000 post and we can't hard code those in the JS 
    const posts: Post[] = await fetch("http://localhost:3000/api/content").then(
        res => res.json() 
    )
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage( { params }: Props ) {
    //    const posts: Post[] = await fetch("http://localhost:3000/api/content", { cache: 'no-cache'}).then( // never cache data 
    const posts: Post[] = await fetch("http://localhost:3000/api/content").then(
        res => res.json()
    )

    const post = posts.find((post) => post.slug === params.slug)!  // ! -> non null assertion in typescript (tells compiler we know we wont have a null value here)
    return (
        <div>
            <h1>{post.title} </h1>
            <p>{post.content}</p>
        </div>
    )
}