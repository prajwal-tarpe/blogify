import Post from '../components/Post';
import Search from '../components/Search';
import { useBlogContext } from '../context/blogContext';

function Home() {
  const { allPosts,filteredPosts,mode } = useBlogContext();
  console.log(allPosts);

  return (
    <div className={`min-h-screen p-4  ${mode==='light'?'bg-gray-100':'bg-gray-900'}`}>
      <div className='mb-12'>
      <Search/>
      </div>
      <div className='flex flex-col items-center'>
        {filteredPosts.map((post) => (
          <Post key={post.id} id={post.id} title={post.title} postText={post.postText} author={post.author?.name && post.author.name}/>
        ))}
      </div>
    </div>
  );
}

export default Home;