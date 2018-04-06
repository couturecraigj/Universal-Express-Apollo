import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Helmet from 'react-helmet';
import ErrorBoundary from '../ErrorBoundary';
import Loading from '../InnerPageLoader';
import OnEnter from '../OnEnter';

const Page = ({ query, match, title, children, root, paginate }) => (
  <ErrorBoundary>
    {title ? (
      <Helmet>
        <title>{title}</title>
      </Helmet>
    ) : null}
    <Query query={query} variables={match.params}>
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <Loading />;
        if (error) throw error;
        return (
          <div>
            {children(data)}
            {paginate &&
              root && (
                <OnEnter
                  onEnter={() => {
                    const { endCursor: after, hasNextPage: exec } = data[
                      root
                    ].pageInfo;
                    if (exec)
                      fetchMore({
                        query,
                        variables: {
                          ...match.params,
                          after
                        },
                        updateQuery: (prev, { fetchMoreResult: more }) => {
                          if (!more) return prev;
                          const { hasNextPage, endCursor } = more[
                            root
                          ].pageInfo;
                          const pageInfo = {
                            ...prev[root].pageInfo,
                            hasNextPage,
                            endCursor
                          };
                          return {
                            ...prev,
                            [root]: {
                              ...prev[root],
                              pageInfo,
                              edges: [...prev[root].edges, ...more[root].edges]
                            }
                          };
                        }
                      });
                  }}
                />
              )}
          </div>
        );
      }}
    </Query>
  </ErrorBoundary>
);

Page.propTypes = {
  query: PropTypes.string.isRequired,
  paginate: PropTypes.bool,
  title: PropTypes.string,
  root: PropTypes.string,
  children: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  })
};

Page.defaultProps = {
  title: undefined,
  match: {},
  paginate: false,
  root: undefined
};

export default Page;
