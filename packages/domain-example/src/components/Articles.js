/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { connect } from 'react-redux';

const Articles = ({ articles }) =>
  articles.map(article => (
    <div className="col s12 m6 l6 xl4" key={article.title}>
      <div className="card large">
        <div className="card-image">
          <LazyLoadImage alt={article.title} src={article.urlToImage} />
        </div>
        <div className="card-content">
          <span className="card-title">{article.title}</span>
        </div>
        <div className="card-action">
          <a href="javascript:void(0)" onClick={() => this.readArticle(article)}>
            Read More
          </a>
        </div>
      </div>
    </div>
  ));

Articles.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.any)
};

Articles.defaultProps = {
  articles: []
};

const mapStateToProps = state => {
  return {
    articles: state.articles
  };
};

export default connect(mapStateToProps)(Articles);
