import React from 'react'

import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'
import PMprojects from '../../components/PMprojectsComponent'

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        {/* <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/blog-index.jpg')`,
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              boxShadow: '0.5rem 0 0 #f40, -0.5rem 0 0 #f40',
              backgroundColor: '#f40',
              color: 'white',
              padding: '1rem',
            }}
          >
            Latest Stories
          </h1>
        </div> */}
        <div style={{}} className="is-size-1 is-size-2-mobile titlebottom">
              <PMprojects />
            </div>
        <div className="columns">
          <div className="column is-one-quarters">
          </div>
          <div className="column is-three-quarters">
            <BlogRoll />
          </div>
          {/* <div className="container">
            <div className="content">
             
            </div>
          </div> */}
        </div>
      </Layout>
    )
  }
}
