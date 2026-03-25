import axios from "axios"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router-dom"
import { fixImageUrl } from "../utils/parseHtmlSections"

export default function Blogs() {
  const { t, i18n } = useTranslation()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const baseUrl = import.meta.env.VITE_BASE_URL
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true)

        const response = await axios.get(
          `${baseUrl}/blogs?lang=${i18n.language}`,
        )

        const mappedBlogs = (response.data.media || []).map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          image: fixImageUrl(item.url),
          date: item.created_at,
          mins: item.mins,
          section: item.section || "General",
        }))

        setBlogs(mappedBlogs)
      } catch (error) {
        console.error("Error fetching blogs:", error)
        setBlogs([])
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [i18n.language, baseUrl])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(i18n.language, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="index, follow" />
        <title>Blogs - Expert Automotive Insights & Tips</title>
        <meta
          name="description"
          content="Read our latest blogs on car maintenance, roadside assistance, safety tips, and automotive trends in Dubai and UAE."
        />
      </Helmet>

      <section
        style={{
          position: "relative",
          width: "100%",
          height: "400px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <img
          src="/new/blogs.webp"
          alt="Automotive Blogs and Articles"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.35)",
            zIndex: 0,
          }}
        />

        <div
          className="text-center"
          data-aos="fade-up"
          style={{ position: "relative", zIndex: 1 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {t("blogs.title")}
          </h1>

          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            {t("blogs.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--secondary-yellow)]"></div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">
                {t("blogs.no_blogs")}
              </h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  data-aos="fade-up"
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[var(--primary-yellow)] text-white text-sm rounded-full">
                        {blog.section}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <span>{formatDate(blog.date)}</span>
                      <span className="mx-2">•</span>
                      <span>
                        {blog.mins} {t("blogs.mins")}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-gray-800 hover:text-yellow-600 transition-colors">
                      {blog.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {blog.description}
                    </p>

                    <button
                      className="inline-flex items-center text-white font-semibold hover:text-yellow-200 cursor-pointer rounded-full px-6 py-2 bg-yellow-500 transition-colors"
                      onClick={() => {
                        navigate(`/page/blog-${blog.id}`, { state: { blog } })
                      }}
                    >
                      {t("blogs.readMore")}
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
