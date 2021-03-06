import React from "react";
import PropTypes from "prop-types";
import "prismjs/themes/prism-okaidia.css";
import Img from "gatsby-image";
import {Container, Row, Col} from "atomize";
import asyncComponent from "../AsyncComponent";
import Headline from "../Article/Headline";
import Bodytext from "../Article/Bodytext";
import Meta from "./Meta";
import Author from "./Author";
import Comments from "./Comments";
import NextPrev from "./NextPrev";

const Share = asyncComponent(() =>
  import("./Share")
    .then(module => {
      return module.default;
    })
    .catch(error => {
    })
);

const Post = props => {
  const {
    post,
    post: {
      html,
      fields: { prefix, slug },
      frontmatter: {
        title,
        category,
        cover: {
          children: [{ fluid }]
        }
      }
    },
    authornote,
    facebook,
    next: nextPost,
    prev: prevPost,
    theme
  } = props;

  return (
    <React.Fragment>
      <header>
        <Container>
          <Row>
            <Col size="8">
              <Headline title={title} theme={theme}/>
              <Meta prefix={prefix} category={category} theme={theme}/>
            </Col>
            <Col size="4">
              <div style={{ "height": "auto" }}>
                <Img style={{ "height": "auto" }} fluid={fluid} />
              </div>
            </Col>
          </Row>
        </Container>
      </header>
      <Bodytext html={html} theme={theme}/>
      <footer>
        <Share post={post} theme={theme}/>
        <Author note={authornote} theme={theme}/>
        <NextPrev next={nextPost} prev={prevPost} theme={theme}/>
        <Comments slug={slug} facebook={facebook} theme={theme}/>
      </footer>
    </React.Fragment>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  authornote: PropTypes.string.isRequired,
  facebook: PropTypes.object.isRequired,
  next: PropTypes.object,
  prev: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default Post;
