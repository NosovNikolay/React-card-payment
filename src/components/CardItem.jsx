import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useCardContext } from './CardContext';
import { CardHolder } from './CardHolder';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import CardNumber from './CardNumber';

const CARDS = {
    visa: '^4',
    amex: '^(34|37)',
    mastercard: '^5[1-5]',
    discover: '^6011',
    unionpay: '^62',
    troy: '^9792',
    diners: '^(30[0-5]|36)'
};

const CardItem = (value) => {
    const [cardNumber] = useCardContext('cardNumber');
    const [isHidden] = useCardContext('isHidden');
    const [cardName] = useCardContext('cardName');
    const [expirationDate] = useCardContext('expirationDate');
    const [cvv] = useCardContext('cvv');
    const [isFront] = useCardContext('isFront');
    const [curFocused] = useCardContext('curFocused');

    const refCardName = useRef();

    const cardType = (cardNumber) => {
        const number = cardNumber;
        let re;
        for (const [card, pattern] of Object.entries(CARDS)) {
            re = new RegExp(pattern);
            if (number.match(re) != null) {
                return card;
            }
        }

        return 'mastercard'; // default type
    };

    let [style, setStyle] = useState();

    const outlineElementStyle = (element) => {
        console.log(element);
        if (element.id === 'v-card-number') {
            return {
                background: 'rgba(0,0,0,.3)',
                marginTop: '138px',
                marginLeft: '15px',
                width: '335px',
                height: '50px',
                transform: `translateX(${element.offsetLeft}px) translateY(${element.offsetTop}px)`
            };
        }

        if (element.id === 'v-card-name') {
            return {
                background: 'rgba(0,0,0,.3)',
                marginTop: '190px',
                marginLeft: '15px',
                width: '310px',
                height: '50px',
                transform: `translateX(${element.offsetLeft}px) translateY(${element.offsetTop}px)`
            };
        }

        return {
            background: 'rgba(0,0,0,.3)',
            marginTop: '205px',
            marginLeft: '330px',
            width: '80px',
            height: '60px'
        };
    };

    useEffect(() => {
        if (curFocused) {
            setStyle(outlineElementStyle(curFocused.current));
        }
    }, [curFocused]);

    const useCardType = useMemo(() => {
        return cardType(cardNumber);
    }, [cardNumber]);

    const ref = useRef();
    return (
        <Flippy
            flipOnClick={false}
            isFlipped={!isFront}
            flipDirection="horizontal" // horizontal or vertical
            ref={ref}>
            <div className="card-item">
                <FrontSide
                    style={{ padding: '0px', borderRadius: '15px' }}
                    value={isFront}
                    onChange={() => {
                        ref.current.toggle();
                    }}>
                    <div className="card-item__side">
                        <div
                            className={`card-item__focus ${curFocused ? `-active` : ``}`}
                            style={style}
                        />
                        <div className="card-item__cover">
                            <img
                                src="https://www.sandboxx.us/wp-content/uploads/2022/02/EU-Jets-2.jpg"
                                className="card-item__bg"
                                alt="a"></img>
                        </div>
                        <div className="card-item__wrapper">
                            <div className="card-item__top">
                                <img
                                    src={require('../assets/coat_of_arms.png')}
                                    className="card-item__coat"
                                    alt="a"></img>
                                <img
                                    className="card-item__type"
                                    alt={useCardType}
                                    src={require(`../assets/types/${useCardType}.png`)}></img>
                            </div>
                            <div className="card-item__tmp">
                                <img
                                    src={require('../assets/chip.png')}
                                    className="card-item__chip"
                                    alt="a"></img>
                                <img
                                    src={require('../assets/nfc.png')}
                                    className="card-item__nfc"
                                    alt="a"></img>
                            </div>

                            <label htmlFor="v-card-number"
                                   className="card-item__number">
                                <CardNumber
                                    cardNumber={cardNumber}
                                    isHidden={isHidden}></CardNumber>
                            </label>
                            <div className="card-item__content">
                                <label htmlFor="v-card-name" className="card-item__info">
                                    <label className="card-item__holder" ref={refCardName}>
                                        Card Holder
                                    </label>
                                    <div className="card-item__name">
                                        <CardHolder cardName={cardName}></CardHolder>
                                    </div>
                                </label>
                                <div className="card-item__date">
                                    <label htmlFor="v-card-month" className="card-item__dateTitle">
                                        Expires
                                    </label>
                                    <SwitchTransition out-in>
                                        <CSSTransition
                                            classNames="slide-fade-up"
                                            timeout={250}
                                            key={expirationDate[0]}>
                                            <span
                                                style={{
                                                    fontFamily: 'Source Code Pro, monospace'
                                                }}>
                                                {expirationDate[0] ? expirationDate[0] : 'MM'}
                                            </span>
                                        </CSSTransition>
                                    </SwitchTransition>
                                    <span
                                        style={{
                                            fontFamily: 'Source Code Pro, monospace'
                                        }}>
                                        /
                                    </span>
                                    <SwitchTransition out-in>
                                        <CSSTransition
                                            classNames="slide-fade-up"
                                            timeout={250}
                                            key={expirationDate[1]}>
                                            <span
                                                style={{
                                                    fontFamily: 'Source Code Pro, monospace'
                                                }}>
                                                {expirationDate[1]
                                                    ? expirationDate[1].slice(2)
                                                    : 'YY'}
                                            </span>
                                        </CSSTransition>
                                    </SwitchTransition>
                                </div>
                            </div>
                        </div>
                    </div>
                </FrontSide>
                <BackSide style={{ padding: '0px', borderRadius: '15px' }}>
                    <div className="card-item__side">
                        <div className="card-item__cover">
                            <img
                                src="https://pbs.twimg.com/media/FMd0OYKWQAII2fE?format=jpg&name=small"
                                alt="a"
                                className="card-item__bg"></img>
                        </div>
                        <div className="card-item__band"></div>
                        <div className="card-item__cvv">
                            <div className="card-item__cvvTitle">CVV</div>
                            <div className="card-item__cvvBand">
                                <span>{cvv[0] ? '*' : ''}</span>
                                <span>{cvv[1] ? '*' : ''}</span>
                                <span>{cvv[2] ? '*' : ''}</span>
                                <span>{cvv[3] ? '*' : ''}</span>
                            </div>
                            <div className="card-item__type"></div>
                        </div>
                    </div>
                </BackSide>
            </div>
        </Flippy>
    );
};

export default CardItem;
