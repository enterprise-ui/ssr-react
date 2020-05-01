import React from 'react';

const Footer: React.FunctionComponent = () => {
    return (
        <footer className="page-footer red">
            <div className="footer-copyright">
                <div className="container">
                    © 2020 News
                    <a className="grey-text text-lighten-4 right" href="https://github.com/enterprise-ui/ssr-react">
                        Source Code
                    </a>
                </div>
            </div>
        </footer>
    );
};

export {Footer};
