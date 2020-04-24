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
    currentArticle: IArticle;
    showModal: boolean;
}

type TProps = IOwnProps & RouteComponentProps<IRouteProps>;

@AsyncDecorator
class HomePage extends React.Component<TProps, IState> {
    static async getInitialProps(store) {
        fetchArticles()(store.dispatch);

        return {};
    }

    state = {
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
        const {currentArticle, showModal} = this.state;

        return (
            <div>
                {this.renderHead()}
                {showModal && <ArticleDetailModal article={currentArticle} onClose={this.handleCloseModal} />}
                <div className="row">
                    <div className="section">
                        <h3>Popular Articles</h3>
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

export default HomePage;
