import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <div className="columns is-multiline">
        {posts &&
          posts.map(({ node: post }) => (
            
            <div className="is-parent column is-12" key={post.id}>
              <div
                className={`box tile is-child box blog-overflow ${
                  post.frontmatter.featuredpost ? "is-featured" : ""
                }`}
              >
                <div
                  className="full-width-image margin-top-0"
                  style={{
                    backgroundImage: `url(${
                      !!post.frontmatter.featuredimage
                        ? post.frontmatter.featuredimage.childImageSharp.fluid.src
                        : post.frontmatter.featuredimage
                    })`,
                    backgroundPosition: `top left`,
                    backgroundAttachment: `fixed`,
                    justifyContent: "center",
                    width: "100%",
                    flexDirection: "column",
                    textAlign: "center"
                  }}
                >
                  <Link
                      to={post.fields.slug}
                    >
                  <h1
                className=" is-size-4-mobile is-size-3-tablet is-size-2-widescreen"
                style={{
                  // boxShadow:
                    // "rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px",
                  // backgroundColor: "rgb(255, 68, 0)",
                  color: "black",
                  lineHeight: "1",
                  padding: "0.25em",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  // width: "80%"
                }}
              >
                {post.frontmatter.title}
              </h1>
              <h3
                className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
                style={{
                  // boxShadow:
                    // "rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px",
                  // backgroundColor: "rgb(255, 68, 0)",
                  color: "black",
                  lineHeight: "1",
                  padding: "0.25em",
                  backgroundColor: "white",
                  borderRadius: "10px"
                }}
              >
                {post.frontmatter.date}
              </h3>
              </Link>
                </div>
                {/* <header>
                  {post.frontmatter.featuredimage ? (
                    <div className="featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${post.title}`
                        }}
                      />
                    </div>
                  ) : null}
                  <p className="post-meta">
                    <Link
                      className="title has-text-primary is-size-4"
                      to={post.fields.slug}
                    >
                      {post.frontmatter.title}
                    </Link>
                    <span> &bull; </span>
                    <span className="subtitle is-size-5 is-block">
                      {post.frontmatter.date}
                    </span>
                  </p>
                </header>
                <p>
                  {post.excerpt}
                  <br />
                  <br />
                  <Link className="button" to={post.fields.slug}>
                    Keep Reading →
                  </Link>
                </p> */}
              </div>
            </div>
          ))}
      </div>
      
    );
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 2048, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
);
