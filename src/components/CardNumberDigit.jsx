import React, { useState } from 'react';
import { CSSTransition, TransitionGroup, SwitchTransition } from 'react-transition-group';

export const CardNumberDigit = (props) => {
    const digit = props.digit;
    const child = props.child;

    let [digitStyle, setDigitStyle] = useState('absolute');
    let [sharpStyle, setSharpStyle] = useState('relative');

    return (
        <TransitionGroup
            className="slide-fade-up"
            component="div"
            style={{ display: 'inline-block' }}>
            {digit ? (
                <CSSTransition
                    onEnter={() => {
                        setSharpStyle('absolute');
                    }}
                    onExited={() => {
                        setSharpStyle('relative');
                    }}
                    classNames="slide-fade-up"
                    timeout={250}
                    key={digit}>
                    <div className="card-item__numberItem" style={{ position: digitStyle }}>
                        {digit}
                    </div>
                </CSSTransition>
            ) : (
                <CSSTransition
                    onEnter={() => {
                        setDigitStyle('absolute');
                    }}
                    onExited={() => {
                        setDigitStyle('relative');
                    }}
                    classNames="slide-fade-up"
                    timeout={250}>
                    <div className="card-item__numberItem" style={{ position: sharpStyle }}>
                        #
                    </div>
                </CSSTransition>
            )}
        </TransitionGroup>
    );
};
