import React, { Component } from "react";

import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

import Layout from "../components/Layout";
import Features from "../components/Features";
import BlogRoll from "../components/BlogRoll";
import PMhome from "../components/PmhomeComponent";
import FrontButton from "../components/frontbutton";
import ColorBar from "../components/ColorBarComponent";

import closeButton from "../img/close-button.png";

// import IndexPageTemplate from '../components/IndexPage'

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const threeJSstyle = {
  height: "100vh",
  width: "100vw"
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
    this.controls.enableZoom = false;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.el.appendChild(this.renderer.domElement); // ThreeJS
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

    console.log(this.props.image);
    return (
      <div>
        <div style={threeJSstyle} ref={ref => (this.el = ref)} />
        <div className="frontui columns is-mobile">
          <div className="column is-half-desktop is-two-thirds-mobile">
            <div style={{}} className="is-size-1 is-size-3-mobile colorbar">
              <ColorBar />
            </div>
            <div style={{}} className="is-size-1 is-size-2-mobile titlebottom">
              <PMhome />
            </div>

            {/* <h1 className="is-size-1 is-size-2-mobile titlebottom">
            Place Matrix
          </h1> */}
          </div>
          <div className="column">
            <div className="field is-grouped titlebottombut">
              <p className="control">
                <Link to="/blog">
                  <button className="button is-rounded frontbuttons">
                    Projects
                  </button>
                </Link>
              </p>

              <p className="control">
                <Link to="/about">
                  <button className="button is-rounded frontbuttons">Learn</button>
                </Link>
              </p>
              <p className="control">
                <Link to="/contact">
                  <button className="button is-rounded frontbuttons">
                    Contact
                  </button>
                </Link>
              </p>
            </div>
          </div>
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
      ></IndexPageTemplate>
      {/* <BlogRoll /> */}
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
