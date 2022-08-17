import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export const CardHolder = (props) => {
    return (
        <TransitionGroup component="div" className="slide-fade-up">
            {props.cardName === '' ? (
                <CSSTransition classNames="slide-fade-up" timeout={250}>
                    <div>FULL NAME</div>
                </CSSTransition>
            ) : (
                props.cardName.split('').map((val, index) => (
                    <CSSTransition timeout={250} classNames="slide-fade-up" key={index}>
                        <span className="card-item__nameItem">{val}</span>
                    </CSSTransition>
                ))
            )}
        </TransitionGroup>
    );
};
