import {IArticle} from 'models';
import React from 'react';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {connect} from 'react-redux';

interface IStateProps {
    articles: IArticle[];
}

interface IOwnProps {
    onReadArticle: (article: IArticle) => void;
}

type TProps = IOwnProps & IStateProps;

const Articles: React.FunctionComponent<TProps> = ({articles, onReadArticle}) => (
    <React.Fragment>
        {articles.map((article) => (
            <div className="col s12 m6 l6 xl4" key={article.title}>
                <div className="card large">
                    <div className="card-image">
                        <LazyLoadImage alt={article.title} src={article.urlToImage} />
                    </div>
                    <div className="card-content">
                        <span className="card-title">{article.title}</span>
                    </div>
                    <div className="card-action">
                        <a href="javascript:void(0)" onClick={() => onReadArticle(article)}>
                            Read More
                        </a>
                    </div>
                </div>
            </div>
        ))}
    </React.Fragment>
);

const mapStateToProps = (state) => {
    return {
        articles: state.articles,
    };
};

export default connect<IStateProps, {}, IOwnProps>(mapStateToProps)(Articles);
