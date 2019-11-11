import React, { Component } from "react";

import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

import Layout from "../components/Layout";
import Features from "../components/Features";
import BlogRoll from "../components/BlogRoll";

// import IndexPageTemplate from '../components/IndexPage'

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const style = {
  height: 250 // we can control scene size by setting container dimensions
};

export class IndexPageTemplate extends Component {
  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }

  // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
  // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
  sceneSetup = () => {
    // get container dimensions and use them for scene sizing
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    this.camera.position.z = 5; // is used here to set some distance from a cube that is located at z = 0
    // OrbitControls allow a camera to orbit around the object
    // https://threejs.org/docs/#examples/controls/OrbitControls
    this.controls = new OrbitControls(this.camera, this.el);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.el.appendChild(this.renderer.domElement); // mount using React ref
  };

  // Here should come custom code.
  // Code below is taken from Three.js BoxGeometry example
  // https://threejs.org/docs/#api/en/geometries/BoxGeometry
  addCustomSceneObjects = () => {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({
      color: 0x156289,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true
    });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);

    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);
  };

  startAnimationLoop = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);

    // The window.requestAnimationFrame() method tells the browser that you wish to perform
    // an animation and requests that the browser call a specified function
    // to update an animation before the next repaint
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  handleWindowResize = () => {
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;

    // Note that after making changes to most of camera properties you have to call
    // .updateProjectionMatrix for the changes to take effect.
    this.camera.updateProjectionMatrix();
  };

  render() {
    const {
      image,
      title,
      // heading,
      subheading,
      mainpitch,
      // description,
      intro
    } = this.props;

    IndexPageTemplate.propTypes = {
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      title: PropTypes.string,
      // heading: PropTypes.string,
      subheading: PropTypes.string,
      mainpitch: PropTypes.object,
      // description: PropTypes.string,
      intro: PropTypes.shape({
        blurbs: PropTypes.array
      })
    };

    console.log(this.props.image)
    return (
      <div>
        <div>
          <div
            className="full-width-image margin-top-0"
            style={{
              backgroundImage: `url(${
                !!image.childImageSharp
                  ? image.childImageSharp.fluid.src
                  : image
              })`,
              backgroundPosition: `top left`,
              backgroundAttachment: `fixed`,
              justifyContent: "left",
            }}
          >
            <div className="column">
            <div
            className="column is-10 is-offset-1"
              style={{
                // display: "flex",
                // height: "150px",
                lineHeight: "1",
                justifyContent: "space-around",
                alignItems: "left",
                flexDirection: "column"
              }}
            >
              <h1
                className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
                style={{
                  // boxShadow:
                    // "rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px",
                  // backgroundColor: "rgb(255, 68, 0)",
                  color: "white",
                  lineHeight: "1",
                  paddingBottom: "0.25em"
                }}
              >
                {title}
              </h1>
              <h3
                className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
                style={{
                  // boxShadow:
                    // "rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px",
                  // backgroundColor: "rgb(255, 68, 0)",
                  color: "white",
                  lineHeight: "1",
                  paddingBottom: "1em"
                }}
              >
                {subheading}
              </h3>
              <button style={{
                  color: "white",
                  textTransform: "uppercase",
                  height: "4rem",
                  width: "20rem",
                  fontSize: "1.8rem",
                  backgroundImage: "linear-gradient(125deg, rgb(129, 100, 251) 0%, rgb(215, 125, 254) 100%)",
                  boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 2px 0px",
                  cursor: "pointer",
                  margin: "1rem",
                  borderWidth: "initial",
                  borderStyle: "none",
                  borderColor: "initial",
                  borderImage: "initial",
                  outline: "none",
                  borderRadius: "2.7rem",
                  transition :"box-shadow 200ms ease-in-out 0s",
                }}>whitepaper</button>
            </div>
            </div>

          </div>
          <section className="section section--gradient">
            <div className="container">
              <div className="section">
                <div className="columns">
                  <div className="column is-10 is-offset-1">
                    <div className="content">
                      <div className="content">
                        <div className="tile">
                          <h1 className="title">{mainpitch.title}</h1>
                        </div>
                        <div className="tile">
                          <h3 className="subtitle">{mainpitch.description}</h3>
                        </div>
                      </div>
                      <div style={style} ref={ref => (this.el = ref)} />
                      {/* <div className="columns">
                        <div className="column is-12">
                          <h3 className="has-text-weight-semibold is-size-2">
                            {heading}
                          </h3>
                          <p>{description}</p>
                        </div>
                      </div> */}
                      <Features gridItems={intro.blurbs} />
                      <div className="columns">
                        <div className="column is-12 has-text-centered">
                          <Link className="btn" to="/products">
                            Get to know the team
                          </Link>
                        </div>
                      </div>
                      <div className="column is-12">
                        <h3 className="has-text-weight-semibold is-size-2">
                          Latest Projects
                        </h3>
                        <BlogRoll />
                        <div className="column is-12 has-text-centered">
                          <Link className="btn" to="/blog">
                            Read more
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        
      </div>
    );
  }
}



const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
      {/* <IndexPageTemplate /> */}
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`;
