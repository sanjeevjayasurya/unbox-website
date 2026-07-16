"use client";

import React, { useEffect } from "react";
import "./index.css";
import QuoteIcon from "../../assets/icons/quote-double.svg";
import { animation } from "../../helpers/utils";
import CommonButton from "../../components/common/CommonButton";
import Link from "next/link";
import { useParams } from "next/navigation";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import { frontendUrl, resolveMediaUrl } from "../../helpers/config";
import ImageComponent from "../../components/common/ImageComponent";
import SimpleLoader from "../../components/loader/SimpleLoader";
import NotFoundComponent from "../../components/common/NotFoundComponent";
import { lukasz } from "../Events/assets";
import TiptapContent from "../../components/common/TiptapContent";
import { useBlogDetail, useRecentBlogs } from "../../hooks/useResources";
import SchemaMarkup from "../../components/common/SchemaMarkup";
import { createBlogSchema } from "../../helpers/schemas";
import ShareSection from "../../components/common/ShareSection";
import RecentBlogsSection from "../../components/common/RecentBlogsSection";

const BlogsDetails = () => {
  const { slug } = useParams();
  const {
    blog,
    isLoading: loadingDetail,
    error: detailError,
  } = useBlogDetail(slug);
  const { recentBlogs } = useRecentBlogs(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const blogUrl = `${frontendUrl}/blogs/${slug}`;
  const blogImageUrl = blog?.image ? resolveMediaUrl(blog.image) : undefined;

  if (detailError) {
    return (
      <>
        <NotFoundComponent
          title="Blog Not Found"
          buttonText="Discover Other Blogs"
          buttonLink="/blogs"
        />
        <RecentBlogsSection recentBlogs={recentBlogs} />
      </>
    );
  }

  if (loadingDetail || !blog) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <SimpleLoader />
      </div>
    );
  }

  return (
    <>
      <HelmetWrapper
        title={blog.title}
        description={blog.description}
        image={blogImageUrl}
        url={blogUrl}
      />
      <SchemaMarkup
        schema={createBlogSchema({ ...blog, image: blogImageUrl }, slug)}
      />
      <div className="bg-[#FDFDFD] class-gap overflow-hidden">
        <div className="blogs-details-div-1">
          <div
            className="blogs-details-data-div">
            <div className="blogs-details-inner-div-1">
              <p className="font-20-regular color-green-1">{blog.type}</p>
              <p className="font-40-semibold color-black-1">{blog.title}</p>
              <p className="font-16-regular color-black-1">{blog.date}</p>
            </div>
            <ShareSection
              url={blogUrl}
              title={blog.title}
              className="max-[1024px]:!hidden"
            />
          </div>
          <div
            className="blogs-details-image-div">
            <img
              src={blogImageUrl}
              className="common-img"
              alt={blog.title || "Blog image"}
              fetchPriority="high"
              loading="eager"
              draggable={false}
            />
          </div>
        </div>

        <div
          className="blogs-details-div-2">
          <TiptapContent
            content={blog.content}
            className="prose casestudy-content whitespace-normal max-w-full"
          />
        </div>

        {blog.quoteMessage && (
          <section
            className="case-study-testimonial">
            {blog.quoteOwnerImage && (
              <div className="case-study-testimonial__media">
                <ImageComponent
                  key={blog.quoteOwnerImage}
                  src={resolveMediaUrl(blog.quoteOwnerImage)}
                  className="common-img"
                />
              </div>
            )}

            <div className="case-study-testimonial__content">
              <QuoteIcon className="case-study-testimonial__quote-mark color-green-1" />
              <q className="case-study-testimonial__message">
                {blog.quoteMessage}
              </q>

              <div className="case-study-testimonial__line" />

              {blog.quoteOwner && (
                <div className="case-study-testimonial__footer">
                  <div className="case-study-testimonial__author">
                    <p className="author-name">
                      {blog.quoteOwner.split(" - (")[0]}
                    </p>
                    {blog.type === "LogiMat" ? (
                      <p className="author-role">
                        Sales Director EMEA, Unbox Robotics
                      </p>
                    ) : (
                      (blog.quoteOwner.split(" - (")[1] || blog.quoteRole) && (
                        <p className="author-role">
                          {blog.quoteOwner
                            .split(" - (")[1]
                            ?.replace(")", "")
                            .trim() || blog.quoteRole}
                        </p>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
        {blog.redirectUrl && (
          <div
            className="blogs-details-btn">
            <Link href={blog.redirectUrl}>
              <CommonButton theme="green" title="Know More" />
            </Link>
          </div>
        )}

        <ShareSection
          url={blogUrl}
          title={blog.title}
          className="!hidden max-[1024px]:!flex"
        />
      </div>

      <RecentBlogsSection recentBlogs={recentBlogs} />
    </>
  );
};

export default BlogsDetails;
