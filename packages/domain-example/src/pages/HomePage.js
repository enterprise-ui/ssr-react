import {Page} from '@poc/ssr-core';
import React from 'react';
import { Helmet } from 'react-helmet';
import { fetchArticles } from '../actions';
import ArticleDetailModal from '../components/ArticleDetailModal';
import Articles from '../components/Articles';

@Page
class HomePage extends React.Component {
  static async getInitialProps(store) {
    console.log('HomePage.getInitialProps');
    fetchArticles()(store.dispatch);

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
    return (
      <Helmet key={Math.random()}>
        <title>SSR Daily News - ilker ALTIN</title>
        <meta property="og:title" content="SSR Daily News - ilker ALTIN" />
        <meta
          name="description"
          content="Breaking news,latest articles, popular articles from most popular news websites of the world"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://react-ssr-ilker.herokuapp.com" />
      </Helmet>
    );
  };

  render() {
    const { currentArticle, modal } = this.state;

    return (
      <div>
        {this.head()}
        {modal ? <ArticleDetailModal handler={this.closeModal} data={currentArticle} /> : null}
        <div className="row">
          <div className="section">
            <h3>Popular Articles</h3>
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

export default HomePage;
