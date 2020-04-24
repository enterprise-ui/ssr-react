import {Page} from '@poc/ssr-core';
import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import ArticleDetailModal from '../components/ArticleDetailModal';
import { fetchArticles } from '../actions';
import Articles from '../components/Articles';

@Page
class ArticleListPage extends React.Component {
  static async getInitialProps(store, props) {
    console.log('ArticleListPage.getInitialProps');
    fetchArticles(props.match.params.id)(store.dispatch);

    return {};
  }

  constructor(props) {
    super(props);

    this.state = {
      currentArticle: {},
      modal: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  readArticle = currentArticle => {
    this.setState({ currentArticle, modal: true });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  head = () => {
    const {
      location,
      match: { params }
    } = this.props;
    const category = params.id;

    return (
      <Helmet key={Math.random()}>
        <title>{`${category} Articles`}</title>
        <meta property="og:title" content={`${category} Articles List`} />
        <meta
          name="description"
          content={`Latest ${category} articles, popular articles from most popular news websites of the world`}
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://react-ssr-ilker.herokuapp.com${location.pathname}`} />
      </Helmet>
    );
  };

  render() {
    const { articles, currentArticle, modal } = this.state;
    const category = articles && articles[0] && articles[0].source.name;

    return (
      <div>
        {this.head()}
        {modal ? <ArticleDetailModal handler={this.closeModal} data={currentArticle} /> : null}
        <div className="row">
          <div className="section">
            <h3>{category}</h3>
          </div>
          <div className="divider" />
          <div className="section">
            <div className="row">
              <Articles />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ArticleListPage.propTypes = {
  location: PropTypes.objectOf(PropTypes.any),
  match: PropTypes.objectOf(PropTypes.any)
};

ArticleListPage.defaultProps = {
  location: null,
  match: {}
};

export default ArticleListPage;
