import {AsyncDecorator} from '@ssr-react/core';
import React from 'react';
import {Helmet} from 'react-helmet';
import {RouteComponentProps} from 'react-router-dom';
import {fetchArticles} from '../actions';
import Articles from '../components/Articles';
import ArticleDetailModal from '../components/ArticleDetailModal';
import {IArticle} from '../models';

interface IRouteProps {
    id: string;
}

interface IOwnProps {}

interface IState {
    articles: IArticle[];
    currentArticle: IArticle;
    showModal: boolean;
}

type TProps = IOwnProps & RouteComponentProps<IRouteProps>;

@AsyncDecorator
class ArticleListPage extends React.Component<TProps, IState> {
    static async getInitialProps({store, props}) {
        console.log('ArticleListPage.getInitialProps');
        fetchArticles(props.match.params.id)(store.dispatch);

        return {};
    }

    state = {
        articles: [],
        currentArticle: null,
        showModal: false,
    };

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleReadArticle = (currentArticle) => {
        this.setState({currentArticle, showModal: true});
    };

    handleCloseModal = () => {
        this.setState({showModal: false});
    };

    renderHead = () => {
        const {
            location,
            match: {params},
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
        const {articles, currentArticle, showModal} = this.state;
        const category = articles?.[0]?.source.name;

        return (
            <div>
                {this.renderHead()}
                {showModal && <ArticleDetailModal article={currentArticle} onClose={this.handleCloseModal} />}
                <div className="row">
                    <div className="section">
                        <h3>{category}</h3>
                    </div>
                    <div className="divider" />
                    <div className="section">
                        <div className="row">
                            <Articles onReadArticle={this.handleReadArticle} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ArticleListPage;
