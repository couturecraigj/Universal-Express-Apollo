import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import gql from 'graphql-tag';
import Page from '../../components/Page';
import Link from '../../components/Style/InlineLink';

export const query = gql`
  query getPost($id: ID!) {
    post(id: $id) {
      title
      author {
        name
        id
      }
    }
  }
`;

const Post = props => (
  <Page query={query} match={props.match}>
    {data => (
      <div>
        <Helmet>
          <title>{data.post.title}</title>
        </Helmet>
        <h1>{data.post.title}</h1>
        <Link to={`/user/${data.post.author.id}`}>
          <div>{`${data.post.author.name}`}</div>
        </Link>
      </div>
    )}
  </Page>
);

Post.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default Post;
