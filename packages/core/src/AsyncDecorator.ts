import React from 'react';
import withAsync from './withAsync';

function AsyncDecorator<C extends React.ComponentType>(BaseComponent: C): C {
    return withAsync(BaseComponent);
}

export default AsyncDecorator;
