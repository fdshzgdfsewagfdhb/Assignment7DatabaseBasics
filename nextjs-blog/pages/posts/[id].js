//wall of imports
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts-firebase';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

// when this file is used the function Post is called
export default function Post({ postData }) {
// this is how the post page is displayed on the website
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

//this is how the post pages know where they are?
export async function getStaticPaths() {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

// this is how that data gotten for the post pages, i think
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
 
  return {
    props: {
      postData,
    },
  };
}
