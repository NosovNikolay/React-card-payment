import React from 'react';
import CardItem from './CardItem';

const CardList = function (value) {
    return (
        <div className="card-list">
            <CardItem value={value} />
        </div>
    );
};

export default CardList;
