import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { CalendarIcon, ClockIcon, TagIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function BlogPage() {
  const { blogSlug } = useParams();
  const location = useLocation();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { t, i18n } = useTranslation();
  const passedBlog = location.state?.blog || null;

  const [blog, setBlog] = useState(passedBlog);
  const [contentHtml, setContentHtml] = useState('');
  const [loading, setLoading] = useState(!passedBlog?.html && !passedBlog);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);

        // Fetch blog content every time language changes
        const res = await axios.get(
          `${baseUrl}/pages?slug=${blogSlug}&lang=${i18n.language}`
        );
        const apiData = res.data;

        const updatedBlog = {
          title: apiData.title || passedBlog?.title || 'Article',
          image: apiData.image || passedBlog?.image || '',
          date: apiData.date || passedBlog?.date || '',
          section: apiData.section || passedBlog?.section || '',
          mins: apiData.mins || passedBlog?.mins || '',
        };
        setBlog(updatedBlog);

        // Process HTML
        let html = apiData.html || apiData.content || passedBlog?.html || '';
        if (html) {
          html = html.replace(/\\"/g, '"').replace(/\\n/g, '').trim();

          // Parse HTML and apply font/RTL like PrivacyAndPolicy
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');

          const isRTL = i18n.language === 'ar' || i18n.language === 'ur';
          const fontFamily =
            i18n.language === 'ar'
              ? '"Noto Kufi Arabic", sans-serif'
              : i18n.language === 'ur'
              ? '"Noto Nastaliq Urdu", serif'
              : '"Manrope", sans-serif';

          doc.body.querySelectorAll('*').forEach((el) => {
            if (el.nodeType === 1) {
              el.removeAttribute('style');
              el.style.fontFamily = fontFamily;
              el.style.fontSize = '16px';
              el.style.lineHeight = '1.6';
              if (isRTL) el.setAttribute('dir', 'rtl');
              el.classList.add('blog-content');
              if (el.tagName.match(/H[1-6]/) || el.tagName === 'STRONG') {
                el.style.fontWeight = 'bold';
                if (el.tagName.match(/H[1-6]/)) {
                  el.style.fontSize = el.tagName === 'H1' ? '24px' : '20px';
                }
              }
            }
          });

          setContentHtml(doc.body.innerHTML);
        }
      } catch (err) {
        console.error('Failed to load blog content:', err);
        setBlog(null);
        setContentHtml('');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [blogSlug, baseUrl, i18n.language, passedBlog]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (!contentHtml) {
    return <p className="text-center mt-20 text-gray-500">No content available</p>;
  }

  console.log('yarb',blog);
  
  return (
    <>
      <Helmet>
        <title>{blog?.title || 'Article'}</title>
        <meta name="description" content={blog?.description || 'Read our latest article'} />
      </Helmet>

      <section className="mx-auto px-4 my-8 container">
        {blog?.image && (
          <img
            src={blog.image}
            alt={blog.title || 'Featured image'}
            className="w-full rounded-xl shadow-lg mb-10 object-cover max-h-[500px]"
          />
        )}

        {blog?.title && (
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {blog.title}
          </h1>
        )}

        {(blog?.date || blog?.section || blog?.mins) && (
        <div className="flex flex-wrap items-center text-gray-500 text-sm mb-8 gap-4">
            {blog.date && (
            <span className="flex items-center gap-1.5">
                <CalendarIcon className="text-[var(--primary-yellow)] w-4 h-4" />
                {blog.date}
            </span>
            )}
            {blog.mins && (
            <span className="flex items-center gap-1.5">
                <ClockIcon className="text-[var(--primary-yellow)] w-4 h-4" />
                {blog.mins} mins reading
            </span>
            )}
            {blog.section && (
            <span className="flex items-center gap-1.5">
                <TagIcon className="text-[var(--primary-yellow)] w-4 h-4" />
                {blog.section}
            </span>
            )}
        </div>
        )}

        <div
          className="prose prose-lg md:prose-xl max-w-none
                     prose-headings:font-bold prose-headings:text-gray-900
                     prose-p:text-gray-700 prose-p:leading-relaxed
                     prose-a:text-yellow-600 hover:prose-a:underline prose-a:font-medium"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </section>
    </>
  );
}