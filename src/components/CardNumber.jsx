import React from 'react';
import { CardNumberDigit } from './CardNumberDigit';

const CardNumber = (props) => {
    const cardNumber = props.cardNumber;
    return (
        <div style={props.style}>
            <CardNumberDigit digit={cardNumber[0]} />
            <CardNumberDigit digit={cardNumber[1]} />
            <CardNumberDigit digit={cardNumber[2]} />
            <CardNumberDigit digit={cardNumber[3]} />

            <div className={'card-item__numberItem'}></div>

            <CardNumberDigit digit={props.isHidden && cardNumber[5] ? '*' : cardNumber[5]} />
            <CardNumberDigit digit={props.isHidden && cardNumber[6] ? '*' : cardNumber[6]} />
            <CardNumberDigit digit={props.isHidden && cardNumber[7] ? '*' : cardNumber[7]} />
            <CardNumberDigit digit={props.isHidden && cardNumber[8] ? '*' : cardNumber[8]} />

            <div className={'card-item__numberItem'}></div>

            <CardNumberDigit digit={props.isHidden && cardNumber[10] ? '*' : cardNumber[10]} />
            <CardNumberDigit digit={props.isHidden && cardNumber[11] ? '*' : cardNumber[11]} />
            <CardNumberDigit digit={props.isHidden && cardNumber[12] ? '*' : cardNumber[12]} />
            <CardNumberDigit digit={props.isHidden && cardNumber[13] ? '*' : cardNumber[13]} />

            <div className={'card-item__numberItem'}></div>

            <CardNumberDigit digit={cardNumber[15]} />
            <CardNumberDigit digit={cardNumber[16]} />
            <CardNumberDigit digit={cardNumber[17]} />
            <CardNumberDigit digit={cardNumber[18]} />
        </div>
    );
};

export default CardNumber;
